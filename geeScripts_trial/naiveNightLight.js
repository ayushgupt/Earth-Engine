var imageCollection=ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS');
print(imageCollection);
var image2000=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152000').select("stable_lights");
var image2001=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152001').select("stable_lights");
var image2002=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152002').select("stable_lights");
var image2003=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152003').select("stable_lights");
var image2004=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152004').select("stable_lights");
var image2005=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152005').select("stable_lights");
var image2006=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152006').select("stable_lights");
var image2007=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152007').select("stable_lights");
var image2008=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152008').select("stable_lights");
var image2009=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F162009').select("stable_lights");
var image2010=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182010').select("stable_lights");
var image2011=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013').select("stable_lights");

var imageList=[image2000,
image2001,
image2002,
image2003,
image2004,
image2005,
image2006,
image2007,
image2008,
image2009,
image2010,
image2011];

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

var districtFull = ee.FeatureCollection('ft:14GinArHQkhV3-Zmp0JDtLfPhDVvVRYkZb2-WId04');

var biharDistrictList=
[
"Arwal",
"Araria",
"AurangabadBihar",
"Banka",
"Begusarai",
"Bhagalpur",
"Bhojpur",
"Buxar",
"Darbhanga",
"Gaya",
"Gopalganj",
"Jamui",
"Jehanabad",
"Kaimur",
"Katihar",
"Khagaria",
"Kishanganj",
"Lakhisarai",
"Madhepura",
"Madhubani",
"Munger",
"Muzaffarpur",
"Nalanda",
"Nawada",
"Pashchim Champaran",
"Patna",
"Purba Champaran",
"Purnia",
"Rohtas",
"Saharsa",
"Samastipur",
"Saran",
"Sheikhpura",
"Sheohar",
"Sitamarhi",
"Siwan",
"Supaul",
"Vaishali"  ];

var districtBihar=districtFull.filter(ee.Filter.inList('name',biharDistrictList));

for(var i=0;i<12;i++)
{
  imageList[i]=imageList[i].expression('L>=4? 1 : 0',{'L':imageList[i].select('stable_lights')});
}

var calculateNightArea = function(feature)
  {
    var newDict={};
    for(var i=0;i<12;i++)
    {
      var sumNightArea = imageList[i].multiply(ee.Image.pixelArea()).reduceRegion
      (
        {
        'reducer': ee.Reducer.sum(),
        'scale':500,
        'geometry': feature.geometry(),
        'maxPixels': 1e9
        }
      )
      newDict['nightArea'+i]=sumNightArea.get('constant');
    }
    var yearwiseNightLight=feature.set(newDict);
    return yearwiseNightLight;
  }
var nalandaNightAreaWithAptFilter = districtBihar.map(calculateNightArea);
Export.table.toDrive(nalandaNightAreaWithAptFilter);

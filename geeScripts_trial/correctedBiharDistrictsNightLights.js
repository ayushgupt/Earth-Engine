var imageCollection=ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS');

//var night2011_1=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F142001').select("stable_lights");
var image=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152001').select("stable_lights");
var limage= ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011').select("stable_lights");

//Map.addLayer(night2011_1,{},"image2011_1");
//Map.addLayer(night2011_2,{},"image2011_2");

print(imageCollection);

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


districtFull=districtFull.filter(ee.Filter.inList('name',biharDistrictList));
//districtFull=districtFull.filterMetadata('name', 'isInList', biharDistrictList);
//('name','indexOf' ,biharDistrictList );


var image1 = image.expression('L<=10? 1 : 0',{'L':image.select('stable_lights')});
var image2 = image.expression('L>10 && L<=20 ? 1 : 0',{'L':image.select('stable_lights')});
var image3 = image.expression('L>20 && L<=30 ? 1 : 0',{'L':image.select('stable_lights')});
var image4 = image.expression('L>30? 1 : 0',{'L':image.select('stable_lights')});

var limage1 = limage.expression('L<=10? 1 : 0',{'L':limage.select('stable_lights')});
var limage2 = limage.expression('L>10 && L<=20 ? 1 : 0',{'L':limage.select('stable_lights')});
var limage3 = limage.expression('L>20 && L<=30 ? 1 : 0',{'L':limage.select('stable_lights')});
var limage4 = limage.expression('L>30? 1 : 0',{'L':limage.select('stable_lights')});

Map.addLayer(image.clip(justBihar),{},"NightLightData");
Map.addLayer(districtFull,{},"BiharDistricts");

var calculateNightArea = function(feature)
{
  var sumNightArea1 = image1.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var sumNightArea2 = image2.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var sumNightArea3 = image3.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var sumNightArea4 = image4.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var lsumNightArea1 = limage1.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var lsumNightArea2 = limage2.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var lsumNightArea3 = limage3.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var lsumNightArea4 = limage4.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  
  var newDict={};
  newDict['nightArea1']=sumNightArea1.get('constant');
  newDict['nightArea2']=sumNightArea2.get('constant');
  newDict['nightArea3']=sumNightArea3.get('constant');
  newDict['nightArea4']=sumNightArea4.get('constant');
  newDict['lnightArea1']=lsumNightArea1.get('constant');
  newDict['lnightArea2']=lsumNightArea2.get('constant');
  newDict['lnightArea3']=lsumNightArea3.get('constant');
  newDict['lnightArea4']=lsumNightArea4.get('constant');
  var typesOfNightLight=feature.set(newDict);
  //var oneVillageWithArea = feature.set('nightArea',sumNightArea);
  return typesOfNightLight;
};


print( calculateNightArea(justBihar));

var nalandaNightAreaWithAptFilter = districtFull.map(calculateNightArea);


Export.table.toDrive(nalandaNightAreaWithAptFilter);


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
modisData= modisData.select(['Land_Cover_Type_2']);

print (modisData)

var img1= ee.Image('MODIS/051/MCD12Q1/2001_01_01');
var img2= ee.Image('MODIS/051/MCD12Q1/2002_01_01');
var img3= ee.Image('MODIS/051/MCD12Q1/2003_01_01');
var img4= ee.Image('MODIS/051/MCD12Q1/2004_01_01');
var img5= ee.Image('MODIS/051/MCD12Q1/2005_01_01');
var img6= ee.Image('MODIS/051/MCD12Q1/2006_01_01');
var img7= ee.Image('MODIS/051/MCD12Q1/2007_01_01');
var img8= ee.Image('MODIS/051/MCD12Q1/2008_01_01');
var img9= ee.Image('MODIS/051/MCD12Q1/2009_01_01');
var img10= ee.Image('MODIS/051/MCD12Q1/2010_01_01');
var img11= ee.Image('MODIS/051/MCD12Q1/2011_01_01');
var img12= ee.Image('MODIS/051/MCD12Q1/2012_01_01');
var img13= ee.Image('MODIS/051/MCD12Q1/2013_01_01');


var imgList=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13];
for(var i=0;i<13;i++)
{
  imgList[i]=imgList[i].expression('L==13? 1 : 0',{'L':imgList[i].select(['Land_Cover_Type_2'])});
}

var calculateUrbanArea = function(feature)
  {
    var newDict={};
    for(var i=0;i<13;i++)
    {
      var sumNightArea = imgList[i].multiply(ee.Image.pixelArea()).reduceRegion
      (
        {
        'reducer': ee.Reducer.sum(),
        'scale':500,
        'geometry': feature.geometry(),
        'maxPixels': 1e9
        }
      )
      newDict['urbanArea'+i]=sumNightArea.get('constant');
    }
    var yearwiseNightLight=feature.set(newDict);
    return yearwiseNightLight;
  }
var biharDistrictUMDurban = districtBihar.map(calculateUrbanArea);
Export.table.toDrive(biharDistrictUMDurban);

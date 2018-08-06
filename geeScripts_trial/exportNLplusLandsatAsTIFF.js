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

print (districtBihar);																																														

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');
var justBihar = states.filterMetadata('name', 'equals', 4);

Map.addLayer(justBihar,{},'onlyBihar');

var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var temporalFiltered = l8.filterDate('2013-01-01', '2013-12-31');
var spatialFiltered1 = temporalFiltered.filterBounds(justBihar).sort('CLOUD_COVER').limit(37);
var mosaic = spatialFiltered1.mosaic();
var nl2013 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013').select("stable_lights");
nl2013=nl2013.expression('L>=0? L+1.0 : 0.0',{'L':nl2013.select('stable_lights')});
nl2013=nl2013.float();
mosaic= mosaic.select(
    ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'], // old names
    ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10']               // new names
);
print (mosaic)
print (nl2013)
var combinedImage= mosaic.addBands(nl2013.select("constant"));
print (combinedImage)

Map.addLayer(mosaic, {}, 'spatial mosaic');
Map.addLayer(mosaic.clip(justBihar), {}, 'clipped mosaic');

Export.image.toDrive({
  image: combinedImage.clip(justBihar),
  description: 'landsatPlusNightLightsBiharState2013',
  scale: 30,
  maxPixels: 1e9,
  region: justBihar
});


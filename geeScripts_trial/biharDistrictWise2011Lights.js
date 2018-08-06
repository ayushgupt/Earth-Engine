var imageCollection=ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS');

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

var districtFull = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1');

districtFull=districtFull.filterBounds(justBihar);


var image= ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011').select("stable_lights");
var image1 = image.expression('L<=10? 1 : 0',{'L':image.select('stable_lights')});
var image2 = image.expression('L>10 && L<=20 ? 1 : 0',{'L':image.select('stable_lights')});
var image3 = image.expression('L>20 && L<=30 ? 1 : 0',{'L':image.select('stable_lights')});
var image4 = image.expression('L>30? 1 : 0',{'L':image.select('stable_lights')});
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
  var newDict={};
  newDict['nightArea1']=sumNightArea1.get('constant');
  newDict['nightArea2']=sumNightArea2.get('constant');
  newDict['nightArea3']=sumNightArea3.get('constant');
  newDict['nightArea4']=sumNightArea4.get('constant');
  var typesOfNightLight=feature.set(newDict);
  //var oneVillageWithArea = feature.set('nightArea',sumNightArea);
  return typesOfNightLight;
};


print( calculateNightArea(justBihar));

var nalandaNightAreaWithAptFilter = districtFull.map(calculateNightArea);

Export.table.toDrive(nalandaNightAreaWithAptFilter);


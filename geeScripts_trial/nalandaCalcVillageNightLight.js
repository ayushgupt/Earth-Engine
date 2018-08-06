
var image=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011');

var imageCollection=ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS');

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

var nalandaFull = ee.FeatureCollection('ft:1OKS8BV4hrhuEFAclBMuSMSmJ_c2vQTHgCA-J4ipA');

var nalandaImage=ee.Image(0).mask(0).paint(nalandaFull,0,2);

var image= ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011').select("stable_lights");

Map.addLayer(image.clip(justBihar),{},"NightLightData");

var calculateNightArea = function(feature)
{
  var sumNightArea = image.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':30,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var oneVillageWithArea = feature.set('nightArea',sumNightArea);
  return oneVillageWithArea;
};


print( calculateNightArea(justBihar));

var nalandaNightArea = nalandaFull.map(calculateNightArea);

Export.table.toDrive(nalandaNightArea);


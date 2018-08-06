//We can see urban area as also the area which contains Night Light


var image=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011');

var modis2012= ee.Image('MODIS/051/MCD12Q1/2012_01_01');

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

var image= ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182011').select("stable_lights");

Map.addLayer(image.clip(justBihar),{},"NightLightData");


var modisUmd= modis2012.select(['Land_Cover_Type_2']);
var modisUmdUrban = modisUmd.eq(12);
var modisUmdUrbanMasked = modisUmdUrban.mask(modisUmdUrban);

Map.addLayer(ee.Image(0).mask(0).paint(justBihar,0,2),{},"justBihar");


var maskedUrbanBihar=modisUmdUrbanMasked.clip(justBihar);

Map.addLayer(maskedUrbanBihar, {'palette': 'FF0000'},"Urban");


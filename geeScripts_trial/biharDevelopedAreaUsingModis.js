//This uses Modis Preclassified Data 
// Mask to plot urban area in Bihar 
// Calculate Area of developed Area in Bihar

var modis2012= ee.Image('MODIS/051/MCD12Q1/2012_01_01')

var modisUmd= modis2012.select(['Land_Cover_Type_2']);
var modisUmdUrban = modisUmd.eq(12);
var modisUmdUrbanMasked = modisUmdUrban.mask(modisUmdUrban);

var Bihar=
ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi')
.filterMetadata('name', 'equals', 4);

Map.addLayer(ee.Image(0).mask(0).paint(Bihar,0,2),{},"Bihar");

var maskedUrbanBihar=modisUmdUrbanMasked.clip(Bihar);

Map.addLayer(maskedUrbanBihar, {'palette': 'FF0000'});

var urbanBihar = modisUmdUrban.clip(Bihar);

var areaImage = ee.Image.pixelArea();
var urbanLandUseArea = urbanBihar.multiply(ee.Image.pixelArea());
var stats = urbanLandUseArea.reduceRegion(
{
'reducer': ee.Reducer.sum(),
'geometry': Bihar,
'maxPixels': 5e9
});
print('urban area: ' + stats.getInfo().Land_Cover_Type_2 + ' square meters');

Map.centerObject(Bihar,10);
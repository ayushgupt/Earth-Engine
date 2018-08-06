var modis2012= ee.Image('MODIS/051/MCD12Q1/2012_01_01');
var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');
var justBihar = states.filterMetadata('name', 'equals', 4);
var modisUmd= modis2012.select(['Land_Cover_Type_2']);
var modisUmdUrban = modisUmd.eq(13);
var modisUmdUrbanMasked = modisUmdUrban.mask(modisUmdUrban);
Map.addLayer(modisUmdUrban.clip(justBihar),{},'urbanBihar');
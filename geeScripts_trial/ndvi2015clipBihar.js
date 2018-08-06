// This code takes NDVI Image for the year 2015 and clips it for bihar and shows it in various Green Shades


var states= ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var ndvi2015= ee.Image('LANDSAT/LC8_L1T_ANNUAL_NDVI/2015');

var justBihar = states.filterMetadata('name', 'equals', 4);

Map.addLayer(ee.Image(0).mask(0).paint(justBihar,0,2),{},"justBihar");



var ndvi_palette = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000,529400,' + '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';

var ndvi_Bihar = ndvi2015.clip(justBihar);
Map.addLayer(ndvi_Bihar, {'min': -0.1, 'max': 1.0, 'palette': ndvi_palette});
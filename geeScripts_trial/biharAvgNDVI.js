//Avg NDVI of Bihar for year 2014

var ndvi2014 = ee.ImageCollection('LANDSAT/LC8_L1T_32DAY_NDVI')
.filterDate('2014-01-01', '2014-12-31');
var maxndvi2014 = ndvi2014.max();
var Bihar= ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi')
.filterMetadata('name', 'equals',4);
var meanNdvi = maxndvi2014.reduceRegion
(
  {
  'reducer': ee.Reducer.mean(),
  'scale':30,
  'geometry': Bihar,
  'maxPixels': 1e9
  }
);
print('average ndvi:' +meanNdvi.getInfo().NDVI);
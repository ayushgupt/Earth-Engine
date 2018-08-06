//Calculates Mean NDVI for each state and creates a job in Tasks Tab

var states= ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');
var meanNdvi2014 = ee.ImageCollection('LANDSAT/LC8_L1T_32DAY_NDVI')
.filterDate('2014-01-01', '2014-12-31').mean();

var calculateNdvi = function(feature)
{
  var meanNdviPerState = meanNdvi2014.reduceRegion
  (
    {
    'reducer': ee.Reducer.mean(),
    'scale':30,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var oneStateWithNdvi = feature.set('ndvi',meanNdviPerState);
  return oneStateWithNdvi;
};
var statesWithNdvi = states.map(calculateNdvi);

Export.table.toDrive(statesWithNdvi);
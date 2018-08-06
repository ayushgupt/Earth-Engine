//Make Chart of Avg Band Values by selecting a point and having a buffer around it


var geometry = ee.Geometry.Point([77.9, 28.54]);

var bufferedPoint = geometry.buffer(100);
Map.addLayer(bufferedPoint)
//Map.setCenter(bufferedPoint,10);
var collection = ee.ImageCollection('LANDSAT/LC8_L1T_TOA').select('B[1-7]');
print(ui.Chart.image.series(collection, bufferedPoint, ee.Reducer.mean()));

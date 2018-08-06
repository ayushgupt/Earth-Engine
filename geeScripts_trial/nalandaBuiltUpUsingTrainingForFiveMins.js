// Image can be found at link 
// https://code.earthengine.google.com/?asset=users/saurabhkumar1311/nalandabuu

image=ee.Image('users/saurabhkumar1311/nalandabuu');

image = image.expression('L>0? 1 : 0',{'L':image.select('constant')});
var nalandaFull = ee.FeatureCollection('ft:1OKS8BV4hrhuEFAclBMuSMSmJ_c2vQTHgCA-J4ipA');

var calculateUrbanArea = function(feature)
{
  var sumUrbanArea = image.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':30,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var oneVillageUrbanArea = feature.set('urbanArea',sumUrbanArea);
  return oneVillageUrbanArea;
};


var nalandaUrbanAreaMoreDataLessTime = nalandaFull.map(calculateUrbanArea);


Export.table.toDrive(nalandaUrbanAreaMoreDataLessTime);


Map.addLayer(image);
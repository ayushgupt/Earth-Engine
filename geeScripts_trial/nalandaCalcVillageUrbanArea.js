

var modis2012= ee.Image('MODIS/051/MCD12Q1/2012_01_01');

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

var nalandaFull = ee.FeatureCollection('ft:1OKS8BV4hrhuEFAclBMuSMSmJ_c2vQTHgCA-J4ipA');

var nalandaImage=ee.Image(0).mask(0).paint(nalandaFull,0,2);


var modisUmd= modis2012.select(['Land_Cover_Type_2']);
var modisUmdUrban = modisUmd.eq(12);
var modisUmdUrbanMasked = modisUmdUrban.mask(modisUmdUrban);

Map.addLayer(ee.Image(0).mask(0).paint(justBihar,0,2),{},"justBihar");


var calculateUrbanArea = function(feature)
{
  var sumUrbanArea = modisUmdUrban.multiply(ee.Image.pixelArea()).reduceRegion
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


var nalandaUrbanArea = nalandaFull.map(calculateUrbanArea);

Export.table.toDrive(nalandaUrbanArea);



var maskedUrbanBihar=modisUmdUrbanMasked.clip(justBihar);

Map.addLayer(maskedUrbanBihar, {'palette': 'FF0000'},"Urban");


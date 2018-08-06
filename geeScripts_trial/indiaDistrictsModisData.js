var modis2011=ee.Image('MODIS/051/MCD12Q1/2011_01_01');

var districtFull = ee.FeatureCollection('ft:14GinArHQkhV3-Zmp0JDtLfPhDVvVRYkZb2-WId04');

var regions=districtFull

var totalArea = modis2011.expression('L>=0? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var water = modis2011.expression('L==0? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var evergreen_needleleaf_forest = modis2011.expression('L==1? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var evergreen_broadleaf_forest = modis2011.expression('L==2? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var deciduous_needleleaf_forest = modis2011.expression('L==3? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var deciduous_broadleaf_forest = modis2011.expression('L==4? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var mixed_forest = modis2011.expression('L==5? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var closed_shrublands = modis2011.expression('L==6? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var open_shrublands = modis2011.expression('L==7? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var woody_savannas = modis2011.expression('L==8? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var savannas = modis2011.expression('L==9? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var grasslands = modis2011.expression('L==10? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var croplands = modis2011.expression('L==12? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var urban = modis2011.expression('L==13? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var barren_or_sparsely_vegetated = modis2011.expression('L==16? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});
var unclassified = modis2011.expression('L==254? 1 : 0',{'L':modis2011.select(['Land_Cover_Type_2'])});




var calculateFeatureArea = function(feature)
{
  var sumArea1 = totalArea.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea2 = water.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea3 = evergreen_needleleaf_forest.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea4 = evergreen_broadleaf_forest.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea5 = deciduous_needleleaf_forest.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea6 = deciduous_broadleaf_forest.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea7 = mixed_forest.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea8 = closed_shrublands.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea9 = open_shrublands.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea10 = woody_savannas.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea11 = savannas.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea12 = grasslands.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea13 = croplands.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea14 = urban.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea15 = barren_or_sparsely_vegetated.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var sumArea16 = unclassified.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':500,
    'geometry': feature.geometry(),
    'bestEffort':true,
    'maxPixels': 1e9
    }
  )
  var newDict={};
  newDict['totalArea']=sumArea1.get('constant');
  newDict['water']=sumArea2.get('constant');
  newDict['evergreen_needleleaf_forest']=sumArea3.get('constant');
  newDict['evergreen_broadleaf_forest']=sumArea4.get('constant');
  newDict['deciduous_needleleaf_forest']=sumArea5.get('constant');
  newDict['deciduous_broadleaf_forest']=sumArea6.get('constant');
  newDict['mixed_forest']=sumArea7.get('constant');
  newDict['closed_shrublands']=sumArea8.get('constant');
  newDict['open_shrublands']=sumArea9.get('constant');
  newDict['woody_savannas']=sumArea10.get('constant');
  newDict['savannas']=sumArea11.get('constant');
  newDict['grasslands']=sumArea12.get('constant');
  newDict['croplands']=sumArea13.get('constant');
  newDict['urban']=sumArea14.get('constant');
  newDict['barren_or_sparsely_vegetated']=sumArea15.get('constant');
  newDict['unclassified']=sumArea16.get('constant');
  var typesOfNightLight=feature.set(newDict);
  return typesOfNightLight;
};



var featureList = regions.map(calculateFeatureArea);

Export.table.toDrive(featureList);


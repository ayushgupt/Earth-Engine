var collec= ee.ImageCollection('USGS/NLCD');
print (collec);
var image1=ee.Image('USGS/NLCD/NLCD1992');
var image2=ee.Image('USGS/NLCD/NLCD2001');
var image3=ee.Image('USGS/NLCD/NLCD2006');
var image4=ee.Image('USGS/NLCD/NLCD2011');

Map.addLayer(image1);
Map.addLayer(image2);
Map.addLayer(image3);
Map.addLayer(image4);


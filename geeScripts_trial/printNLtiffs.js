var nl2013 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013').select("stable_lights");

print (nl2013)

nl2013=nl2013.expression('L>=0? L+1 : 0',{'L':nl2013.select('stable_lights')});

var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

Map.addLayer(nl2013.clip(justBihar));

Export.image.toDrive({
  image: nl2013.clip(justBihar),
  description: 'biharNL2013_3',
  scale: 500,
  region: justBihar
});

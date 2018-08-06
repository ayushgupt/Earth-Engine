//Cart Classify
//Train using Labelled Geometry in Fusion Table and classify an area 


// Use these bands for prediction.
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

// Load a Landsat 8 image to be used for prediction.
var image = ee.Image('LANDSAT/LC8_L1T_TOA/LC82320672013207LGN00').select(bands);

// Load training points. The numeric property 'class' stores known labels.
var points = ee.FeatureCollection('ft:10X7SUjDTiFJDyIA58zLcptK8pwBwjj1BV12SQOgJ')
    .remap([1, 2], [0, 1], 'class');

// Overlay the points on the imagery to get training.
var training = image.sampleRegions(points, ['class'], 30);

// Train a CART classifier with default parameters.
var trained = ee.Classifier.cart().train(training, 'class', bands);

// Classify the image with the same bands used for training.
var classified = image.select(bands).classify(trained);

// Display the inputs and the results.
Map.centerObject(image, 10);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.4}, 'image');
Map.addLayer(classified, {min: 0, max: 1, palette: ['00FF00', 'FF0000']},
  'classification');
    
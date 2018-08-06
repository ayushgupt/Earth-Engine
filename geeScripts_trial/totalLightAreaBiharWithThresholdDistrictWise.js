

var districtFull = ee.FeatureCollection('ft:14GinArHQkhV3-Zmp0JDtLfPhDVvVRYkZb2-WId04');

var biharDistrictList=
[
"Arwal",
"Araria",
"AurangabadBihar",
"Banka",
"Begusarai",
"Bhagalpur",
"Bhojpur",
"Buxar",
"Darbhanga",
"Gaya",
"Gopalganj",
"Jamui",
"Jehanabad",
"Kaimur",
"Katihar",
"Khagaria",
"Kishanganj",
"Lakhisarai",
"Madhepura",
"Madhubani",
"Munger",
"Muzaffarpur",
"Nalanda",
"Nawada",
"Pashchim Champaran",
"Patna",
"Purba Champaran",
"Purnia",
"Rohtas",
"Saharsa",
"Samastipur",
"Saran",
"Sheikhpura",
"Sheohar",
"Sitamarhi",
"Siwan",
"Supaul",
"Vaishali"  ];


var regions=districtFull.filter(ee.Filter.inList('name',biharDistrictList));



//=============================================================================================================
//S1 File: Extraction of lit area estimates - Google Earth Engine JS code
//Code authored Jeremy Proville, Environmental Defense Fund
//Code URL: https://code.earthengine.google.com/cae7da668d44c4aa27e9940fb47053c7
//Contact email: jproville@edf.org
//=============================================================================================================
var blank = ee.Image(0);
var images = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').select("stable_lights");

function arealit(i){
  var thold = blank.where(i.gt(5),1);
  var alit = thold.mask(thold);
  alit = ee.Image.pixelArea().mask(alit);
  alit = alit.divide(1000000);
  alit = alit.set('index',i.get('system:index'));
  return alit;
  }

function tabulate(i){
  return regions.map(function (f){
    var r = i.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: f.geometry(), 
      scale: 500,
      bestEffort:true,
      maxPixels:1e9});
    return ee.Feature(null, {
      name: f.get('name'),
      area: r.get('area'),
      index: i.get('index')});
  });}
        
var results = images.map(arealit);
var resultstable = results.map(tabulate).flatten();
//=============================================================================================================
// Note: Uncomment the following line to create the export task. Beware of longer calculation
//       time when running it as-is across the entire DMSP data record. For faster processing 
//       times, narrow down the scope of dates or regions via filtering.
Export.table.toDrive(resultstable,'DMSP_results','ayushGEE','results','csv');
var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

Map.addLayer(regions,{opacity:0.6},'country_borders');
Map.addLayer(results.select('area'),{palette:'red'},'Area Lit, DN>31');
// Intercalibration of DMSP-OLS night-time light data
// by the invariant region method
// Power Coefficients

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

// var regions=regions1.filterMetadata('name', 'equals', 'Egypt');

//=============================================================================================================
//S1 File: Extraction of lit area estimates - Google Earth Engine JS code
//Code authored Jeremy Proville, Environmental Defense Fund
//Code URL: https://code.earthengine.google.com/cae7da668d44c4aa27e9940fb47053c7
//Contact email: jproville@edf.org
//=============================================================================================================
var blank = ee.Image(0);
var images = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').select("stable_lights");

var coff1 = {};
coff1["F121999"]=0;
coff1["F142000"]= 1.2445;
coff1["F142001"]= 0.3811;
coff1["F142002"]= 1.2242;
coff1["F142003"]= 0.8802;
coff1["F152000"]= 0.1832;
coff1["F152001"]= ~0.7078;
coff1["F152002"]= 0.1354;
coff1["F152003"]= 0.3589;
coff1["F152004"]= 0.7187;
coff1["F152005"]= 0.7567;
coff1["F152006"]= 0.9387;
coff1["F152007"]= 1.6464;
coff1["F162004"]= 0.3607;
coff1["F162005"]= 0.1794;
coff1["F162006"]= 0.1955;
coff1["F162007"]= 0.9177;
coff1["F162008"]= 0.675;
coff1["F162009"]= 1.9043;
coff1["F182010"]= 2.9053;
coff1["F182011"]= 3.1449;
coff1["F182012"]= 2.1239;
coff1["F182013"]= 2.1382;


var coff2 = {};
coff2["F121999"]=1;
coff2["F142000"]  = 1.3076;
coff2["F142001"]  = 1.3103;
coff2["F142002"]  = 1.1542;
coff2["F142003"]  = 1.2381;
coff2["F152000"]  = 1.0418;
coff2["F152001"]  = 1.1191;
coff2["F152002"]  = 0.9587;
coff2["F152003"]  = 1.4992;
coff2["F152004"]  = 1.32; 
coff2["F152005"]  = 1.2666;
coff2["F152006"]  = 1.266;  
coff2["F152007"]  = 1.248;  
coff2["F162004"]  = 1.1809;
coff2["F162005"]  = 1.3906;
coff2["F162006"]  = 1.1322;
coff2["F162007"]  = 0.8841;
coff2["F162008"]  = 0.9773;
coff2["F162009"]  = 0.974;  
coff2["F182010"]  = 0.4593;
coff2["F182011"]  = 0.6453;
coff2["F182012"]  = 0.5975;
coff2["F182013"]  = 0.6683;

var coff3= {};
coff3["F121999"]=0;
coff3["F142000"]= ~0.0051;  
coff3["F142001"]= ~0.0050;  
coff3["F142002"]= ~0.0030;  
coff3["F142003"]= ~0.0039;  
coff3["F152000"]= ~0.0010;  
coff3["F152001"]= ~0.0015;  
coff3["F152002"]= 0.0008; 
coff3["F152003"]= ~0.0078;  
coff3["F152004"]= ~0.0050;  
coff3["F152005"]= ~0.0040;  
coff3["F152006"]= ~0.0040;  
coff3["F152007"]= ~0.0038;  
coff3["F162004"]= ~0.0032;  
coff3["F162005"]= ~0.0060;  
coff3["F162006"]= ~0.0017;  
coff3["F162007"]= 0.0017; 
coff3["F162008"]= 0.0001; 
coff3["F162009"]= ~0.0007;  
coff3["F182010"]= 0.007;  
coff3["F182011"]= 0.0036; 
coff3["F182012"]= 0.0054; 
coff3["F182013"]= 0.0039; 


var coffB = 0,coffA=0,coffC=0;

function setCoff(key)
{
  coffA = coff1[key];
  coffB = coff2[key];
  coffC = coff3[key];
}

function arealit(i)
{
  var satKey=i.get('system:index');
  var image1=blank.where(
  i.select('stable_lights').gt(0),coffA
  );
  var image2=blank.where(
    i.select('stable_lights').gt(0),coffB
    );
  var image3=blank.where(
    i.select('stable_lights').gt(0),coffC
    );
  var alit = i.expression('L>0?  (coffC+coffB*L+coffC*(L**2)) : 0',
  {
  'L':i.select('stable_lights'),
  'coffA':image1.select('constant'),
  'coffB':image2.select('constant'),
  'coffC':image3.select('constant'),
  });
  var alit1 = alit.expression('L>63?  (63) : L',
  {
  'L':alit.select('stable_lights')
  });
 
  var alit2=alit1.multiply(ee.Image.pixelArea());
  var alit3 = alit2.divide(1000000);
  var alit4 = alit3.set('index',satKey);
  return alit4;
}

function tabulate(i)
{
  return regions.map(function (f)
  {
    var r = i.reduceRegion(
    {
      reducer: ee.Reducer.sum(), 
      geometry: f.geometry(), 
      scale: 500,
      bestEffort:true,
      maxPixels:1e9
    }
    );
    return ee.Feature(null, 
    {
      name: f.get('name'),
      area: r.get('constant'),
      index: i.get('index')
    }
    );
  }
  );
}
var resultstable = ee.FeatureCollection([]);
for(var k in coff1)
{
  setCoff(k);
  var results = images.filter(ee.Filter.eq("system:index",k)).map(arealit);
  resultstable = resultstable.merge(results.map(tabulate).flatten());
}
//=============================================================================================================
// Note: Uncomment the following line to create the export task. Beware of longer calculation
//       time when running it as-is across the entire DMSP data record. For faster processing 
//       times, narrow down the scope of dates or regions via filtering.
Export.table.toDrive(resultstable,'DMSP_results','ayushGEE','results','csv');
print(resultstable);
var states = ee.FeatureCollection('ft:160zyLleO3NDRUYNV7dCNbGs03AzeUZxiy2I5-JSi');

var justBihar = states.filterMetadata('name', 'equals', 4);

Map.addLayer(regions,{opacity:0.6},'country_borders');
Map.addLayer(results.select('constant'),{palette:'red'},'Area Lit, DN>31');

Map.addLayer(blank);
//Make a polygon and get the timeSeries Plot of that area for a year

var washington= //Make a Polygon

var Daymet= ee.ImageCollection('NASA/ORNL/DAYMET')

var maxT2015 = Daymet.filterDate('2015-01-01', '2015-12-31')
.select('tmax');

var maxTTimeSeries = ui.Chart.image.seriesByRegion
(maxT2015, washington, ee.Reducer.mean(), 'tmax', 200)
.setChartType('ScatterChart')
.setOptions
({
title: 'Temperature trends',
vAxis: {title: 'Temperature (Celsius)'},
lineWidth: 1,
pointSize: 4,
series: {
0: {color: 'FF0000'}
}
});
print(maxTTimeSeries);
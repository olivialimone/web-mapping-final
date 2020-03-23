//load my mapbox accessToken
mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmlhbGltb25lIiwiYSI6ImNrNmxmOXNqNzBlZnEzZG52M3dqdTF2anEifQ._jw03o430C3a-tly3N6-DQ';

//map centered on NYC
var initialCenterPoint = [-73.9712, 40.7128]
var initialZoom = 9.4

// set the default text for the feature-info div
var defaultText = '<p>Move the mouse XYZ</p>'
$('#feature-info').html(defaultText)

// create map container
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

// create the map
var map = new mapboxgl.Map(initOptions);

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on('style.load', function() {

// add a geojson source to the map using our external geojson file
  map.addSource('subway-access', {
    type: 'geojson',
    data: './data/subway-access.geojson',
  });

// add a geojson source to the map using our external geojson file
  map.addSource('subway-lines', {
    type: 'geojson',
    data: './data/subway-access.geojson',
  });

  // log the current map state to the console
  console.log(map.getStyle().sources);

  // add the subway lines and their corresponding colors
  map.addLayer({
      id: 'subway-lines-fill',
      type: 'fill',
      source: 'subway-lines',
      paint:

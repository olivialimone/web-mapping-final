//load my mapbox accessToken
mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmlhbGltb25lIiwiYSI6ImNrNmxmOXNqNzBlZnEzZG52M3dqdTF2anEifQ._jw03o430C3a-tly3N6-DQ';

//map centered on NYC
var initialCenterPoint = [-73.9712, 40.7128]
var initialZoom = 9.9

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

//creating a variable for subway colors
//there's a variable in the geoJSON with the color per line
var colorStopsData = [
  ["#EE352E", "#EE352E"],//color for 123
  ["#00933C", "#00933C"],//color for 456
  ["#B933AD", "#B933AD"],//color for 7
  ["#6CBE45", "#6CBE45"],//color for G
  ["#FCCC0A", "#FCCC0A"],//color for NQRW
  ["#2850AD", "#2850AD"],//color for ACE
  ["#FF6319", "#FF6319"],//color for BDFM
  ["#996633", "#996633"],//color for JZ
  ["#A7A9AC", "#A7A9AC"],//color for L
  ["#6D6E71", "#6D6E71"],//color for 42nd St S
  ["#808183", "#808183"],//color for Franklin Av S
  ["#053159", "#053159"],//color for SIR
]

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
  map.on("load", function() {
    // add a geojson source to the map using our external geojson file
    map.addSource('subway-lines', {
      type: 'geojson',
      data: './data/subway-lines.geojson',
    });

      map.addLayer({
        id: "subwayLines",
        type: "line",
        source: 'subway-lines',
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": {
            property: "color",
            type: "categorical",
            stops: colorStopsData
          },
          "line-width": {
            base: 1,
            stops: [[9, 1], [11, 1], [13, 5], [15, 10]]
          }
        }
      });
  // add a geojson source to the map using our external geojson file
  //map.addSource('subway-access', {
  //type: 'geojson',
  //data: './data/subway-access.geojson',
  //});

  // log the current map state to the console
  console.log(map.getStyle().sources);

  // add the subway lines and their corresponding colors
  //map.addLayer({
    //id: 'subway-lines-color',
    //type: 'line',
    //source: 'subway-lines',
    //layout: {
      //'line-join': 'round',
      //'line-cap': 'round'
  //  },
    //'paint': {
      //'line-color': 'subway-lines'.color,
      //'line-width': 5
  //  }



    //For each subway station, I want to add a popup with information about accessibility
    //new mapboxgl.Marker()
    //.setLngLat(['subway-access'.stop_lon, 'subway-access'.stop_lat])
    //.setPopup(new mapboxgl.Popup({
    //offset: 25
    //}) // add popups
    //.setHTML(`${subway-access.stop_name} "is " `))
    //  .addTo('map-container');
  });

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

// add a geojson source to the map using our external geojson file
map.addSource('subwayLineData', {
  type: 'geojson',
  data: './data/subway-lines.geojson',
});

//creating a variable for subway colors
var colorStopsData = [
  ["1", "#EE352E"],
  ["2", "#EE352E"],
  ["3", "#EE352E"],
  ["4", "#00933C"],
  ["5", "#00933C"],
  ["6", "#00933C"],
  ["7", "#B933AD"],
  ["G", "#6CBE45"],
  ["Q", "#FCCC0A"],
  ["M", "#FF6319"],
  ["S", "#A7A9AC"],
  ["A", "#0039A6"],
  ["B-D", "#FF6319"],
  ["B-D-F-M", "#FF6319"],
  ["R", "#FCCC0A"],
  ["N-Q-R", "#FCCC0A"],
  ["N-Q", "#FCCC0A"],
  ["N-R", "#FCCC0A"],
  ["F", "#FF6319"],
  ["F-M", "#FF6319"],
  ["E", "#0039A6"],
  ["J-Z", "#996633"],
  ["L", "#A7A9AC"],
  ["A-C", "#0039A6"],
  ["D", "#FF6319"],
  ["1-2-3", "#EE352E"],
  ["B", "#FF6319"],
  ["N", "#FCCC0A"],
  ["4-5-6", "#00933C"],
  ["N-W", "#FCCC0A"],
  ["2-3", "#EE352E"],
  ["4-5", "#00933C"],
  ["A-C-E", "#0039A6"],
  ["N-Q-R-W", "#FCCC0A"],
  ["N-R-W", "#FCCC0A"],
  ["R-W", "#FCCC0A"]
]

// create the map
var map = new mapboxgl.Map(initOptions);

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
  map.on("load", function() {
      map.addLayer({
        id: "subwayLines",
        type: "line",
        source: {
          type: "geojson",
          data: subwayLineData
        },
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": {
            property: "stop_name",
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

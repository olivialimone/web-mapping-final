//load my mapbox accessToken
mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmlhbGltb25lIiwiYSI6ImNrNmxmOXNqNzBlZnEzZG52M3dqdTF2anEifQ._jw03o430C3a-tly3N6-DQ';

//map centered on NYC
var initialCenterPoint = [-73.9712, 40.7128]
var initialZoom = 9.5

// set the default text for the feature-info div
var defaultText = '<p>Move the mouse XYZ</p>'
$('#feature-info').html(defaultText)

// create map container
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/dark-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

// create the map
var map = new mapboxgl.Map(initOptions);

//creating a variable for subway colors
//there's a variable in the geoJSON with the color per line
var colorStopsData = [
  ["#EE352E", "#EE352E"], //color for 123
  ["#00933C", "#00933C"], //color for 456
  ["#B933AD", "#B933AD"], //color for 7
  ["#6CBE45", "#6CBE45"], //color for G
  ["#FCCC0A", "#FCCC0A"], //color for NQRW
  ["#2850AD", "#2850AD"], //color for ACE
  ["#FF6319", "#FF6319"], //color for BDFM
  ["#996633", "#996633"], //color for JZ
  ["#A7A9AC", "#A7A9AC"], //color for L
  ["#6D6E71", "#6D6E71"], //color for 42nd St S
  ["#808183", "#808183"], //color for Franklin Av S
  ["#053159", "#053159"], //color for SIR
]

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on("load", function() {
  // add my geojson source of subway lines to the map using an external geojson file
  map.addSource('subway-lines', {
    type: 'geojson',
    data: './data/subway-lines.geojson',
  });
  //adding layer to display the subway lines and their respective colors
  //code inspiration from: https://codepen.io/bradleyboy/pen/Yryybq
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
        stops: [
          [9, 1],
          [11, 1],
          [13, 5],
          [15, 10]
        ]
      }
    }
  });
  //adding subway station data with accessibility and elevator outage information
  map.addSource('subway-access', {
    type: 'geojson',
    data: './data/subway-access.geojson',
  });
  //adding circles for subway station locations
  map.addLayer({
    id: "stations",
    source: "subway-access",
    type: "circle",
    paint: {
      "circle-radius": {
        base: 1,
        stops: [
          [9, 1],
          [12, 3],
          [13, 5],
          [15, 10]
        ]
      },
      //if the station is not accessible, it is red
      //if the station is accessible, it is green
      "circle-color": [
        'match',
        ['get', 'access'],
        0,
        'red',
        1,
        'green',
        '#ccc'
      ],
      "circle-stroke-color": "black",
      "circle-stroke-width": {
        base: 1,
        stops: [
          [9, 1],
          [12, 3],
          [13, 1],
          [15, 2]
        ]
      }
    }
  });
  //adding subway station names with same color designation
  map.addLayer({
    id: "stop-name",
    source: "subway-access",
    type: "symbol",
    paint: {
      "text-color": [
        'match',
        ['get', 'access'],
        0,
        'red',
        1,
        'green',
        '#ccc'
      ],
      "text-halo-color": "black",
      "text-halo-width": 1,
      "text-halo-blur": 4
    },
    layout: {
      "text-font": ["Open Sans Regular"],
      "text-field": "{stop_name}",
      "text-size": {
        base: 12,
        stops: [
          [9, 0],
          [12, 8],
          [13, 10],
          [14, 12],
          [17, 20]
        ]
      },
      "text-anchor": "right",
      "text-offset": [-1.5, 0]
    }
  });
});

//opens pop up for click event for features in station layer
//code inspiration from https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
map.on('click', 'stations', function(e) {
  var description = e.features[0].properties.stop_name;

  if (e.features[0].properties.access == 0) {
    description = description + " is inaccessible."
  } else {
    if (e.features[0].properties.outages == 'null') {
      description = description + " is accessible."
    } else {
      description = description + " is accessible and has had " + e.features[0].properties.outages + " outages in Feb. 2020."
    }
  }

  new mapboxgl.Popup()
    .setLngLat([e.features[0].properties.stop_lon, e.features[0].properties.stop_lat])
    .setHTML(description)
    .addTo(map);
});

//event listeners for the fly-to buttons
$('#nbrooklyn').on('click', function() {
  map.flyTo({
    center: [-73.9442, 40.6782],
    zoom: 12
  })
})
$('#sbrooklyn').on('click', function() {
  map.flyTo({
    center: [-73.979820, 40.612544],
    zoom: 12
  })
})
$('#bronx').on('click', function() {
  map.flyTo({
    center: [-73.902126, 40.838733],
    zoom: 12
  })
})
$('#queens').on('click', function() {
  map.flyTo({
    center: [-73.875723, 40.737296],
    zoom: 12
  })
})
$('#uptown').on('click', function() {
  map.flyTo({
    center: [-73.967741, 40.792376],
    zoom: 12
  })
})
$('#downtown').on('click', function() {
  map.flyTo({
    center: [-73.993578, 40.725880],
    zoom: 12.5
  })
})
$('#staten').on('click', function() {
  map.flyTo({
    center: [-74.070514, 40.608486],
    zoom: 11.85
  })
})
$('#nyc').on('click', function() {
  map.flyTo({
    center: initialCenterPoint,
    zoom: initialZoom
  })
})

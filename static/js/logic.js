function createMap(earthquakes) { 
    console.log(earthquakes);
 var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap
  };

  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  var map = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
    
    var earthquakes = response.features;
    var earthquake_markers = []
    
    for (let earthquake of earthquakes) {
        var earthquake_marker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
        .bindPopup("<h3>" + earthquake.geometry.coordinates[0] + "</h3><h3>: " 
        + earthquake.geometry.coordinates[1] + "</h3><h3>: "+ earthquake.properties.place +"</h3>")
        earthquake_markers.push(earthquake_marker)
    }
    console.log(earthquake_markers)
    createMap(L.layerGroup(earthquake_markers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(createMarkers);
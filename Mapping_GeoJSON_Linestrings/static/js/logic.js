// Add console.log to check to see if our code is working.
console.log("working");
//// Create the map object with center at the San Francisco airport.
//let map = L.map('mapid').setView([30,30], 2);


// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/dark-v10',
    accessToken: API_KEY
});

//create a base layer that holds both maps
let baseMaps = {
  "Day Navigation": light,
  "Night Navigation": dark
};


// create map object with a center a zoomn level, this works better for multi map setups
let map = L.map("mapid", {
  center: [44.0,-80.0],
  zoom: 2,
layers: [dark]
});

//pass our map laters into our laters control and add the layes control to the map
L.control.layers(baseMaps).addTo(map)



// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/mearsdj/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

//grabing geojson data from url
d3.json(torontoData).then(function(data) {
  console.log(data);
  //create a geojson layer with retreived data
  L.geoJSON(data,{
    style:myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2>"
      + "<hr><h3> Destination: " + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
dark.addTo(map);

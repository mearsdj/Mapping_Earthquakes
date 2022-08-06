// Add console.log to check to see if our code is working.
console.log("working");
//// Create the map object with center at the San Francisco airport.
//let map = L.map('mapid').setView([30,30], 2);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/satellite-streets-v11',
    accessToken: API_KEY
});

//create a base layer that holds both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};


// create map object with a center a zoomn level, this works better for multi map setups
let map = L.map("mapid", {
  center: [43.7,-79.3],
  zoom: 11,
layers: [streets]
});

//pass our map laters into our laters control and add the layes control to the map
L.control.layers(baseMaps).addTo(map)



// Accessing the Toronto neighborhood GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/mearsdj/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// // Create a style for the lines.
let myStyle = {
  color: "blue",
  fillColor:"yellow",
  weight: 1
}

//grabing geojson data from url
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  //create a geojson layer with retreived data
  L.geoJSON(data
    ,{
    style:myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>"
      // + "<hr><h3> Destination: " + feature.properties.dst + "</h3>"
      );
    }
  }
  ).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Add console.log to check to see if our code is working.
console.log("working");
//// Create the map object with center at the San Francisco airport.
//let map = L.map('mapid').setView([30,30], 2);




// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // turn each feature into marker on map.
//   pointToLayer: function(feature,latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2>"
//     + "<hr>" + feature.properties.city + "<br>" +
//     feature.properties.country);
//   }
// }).addTo(map);

//grabbing geojson and using on each feature instead of pointToLayer
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + feature.properties.faa + "</h2>"
//          + "<hr>" + feature.properties.name);
//   }
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
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
  Street: streets,
  Dark: dark
};


// create map object with a center a zoomn level, this works better for multi map setups
let map = L.map("mapid", {
  center: [30,30],
  zoom: 2,
layers: [streets]
});

//pass our map laters into our laters control and add the layes control to the map
L.control.layers(baseMaps).addTo(map)



// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/mearsdj/Mapping_Earthquakes/main/majorAirports.json";

//grabing geojson data from url
d3.json(airportData).then(function(data) {
  console.log(data);
  //create a geojson layer with retreived data
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>" + feature.properties.faa + "</h2>"
      + "<hr>" + feature.properties.name);
    }
  }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

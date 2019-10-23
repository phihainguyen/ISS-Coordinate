const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
let first = true;

async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data.latitude);
  console.log(data.longitude);
  //below is an example to grab the key/value of the object literal without having to refer to the object and scaling the tree to get to itlike done above in the console
  const { latitude, longitude, velocity, altitude } = data;
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("alt").textContent = altitude.toFixed(2);
  document.getElementById("vel").textContent = velocity.toFixed(2);

  marker.setLatLng([latitude, longitude]);

  if (first) {
    mymap.setView([latitude, longitude], 2);
    first = false;
  }
}

getData();
setInterval(getData, 10000);

//USING LEAFLET.js is a library which will help us create the map

//=====MAP SETUP====//
//creating a map starting of with a lat-long coordinate of zero with a zoom of 1 meaning its zoomed out
const mymap = L.map("ISSmap").setView([0, 0], 1);

//creating a marker with a custom icon of the ISS
const ISSicon = L.icon({
  iconUrl: "International_Space_Station.svg",
  iconSize: [50, 30],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: ISSicon }).addTo(mymap);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileURL, { attribution });

tiles.addTo(mymap);

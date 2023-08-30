<script setup>
import {ref, onMounted} from 'vue';
import L from 'leaflet';
import {getDatabase, ref as dbRef, get, push} from "firebase/database";
import {db} from '../firebaseConfig.js';

onMounted(async () => {
  const map = L.map('map').setView([51.505, 29.484], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const db = getDatabase();
  const markersRef = dbRef(db, 'markers');
  const myIcon = L.icon({
    iconUrl: 'images/material-symbols_location-on.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    iconRetinaUrl: 'images/material-symbols_location-on-2x.png',
    shadowUrl: 'images/marker-shadow.png',
    shadowSize: [35, 35],
    shadowAnchor: [17, 35],
    popupAnchor: [1, -16],
  });

  map.on('click', function (e) {
    const newMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: myIcon}).addTo(map);
    console.log(newMarker);
    push(markersRef, e.latlng);
  });

  const snapshot = await get(markersRef);
  if (snapshot.exists()) {
    const markersData = snapshot.val();
    Object.values(markersData).forEach(marker => {
      L.marker([marker.lat, marker.lng]).addTo(map);
    });
  }
});
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  height: 90vh;
  width: 100%;
}
</style>

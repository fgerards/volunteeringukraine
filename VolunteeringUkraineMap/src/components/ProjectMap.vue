<script>
import { defineComponent } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup,
} from '@vue-leaflet/vue-leaflet';
import markerData from '../assets/markers.json';

export default defineComponent({
  name: 'ProjectMap',
  components: {
    LPopup,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      mapOptions: {
        zoomSnap: 0.2,
      },
      importedMarkers: markerData,
      icon: L.icon({
        iconUrl: 'images/material-symbols_location-on.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        iconRetinaUrl: 'images/material-symbols_location-on-2x.png',
        shadowUrl: 'images/marker-shadow.png',
        shadowSize: [25, 32],
        shadowAnchor: [7, 30],
        popupAnchor: [1, -16],
      }),
    };
  },
  methods: {
    async readyHandler() {
      const lBounds = [
        [51, 22],
        [47, 39.9],
      ];
      const map = this.$refs.map.leafletObject;
      map.flyToBounds(lBounds, { duration: 0.6, easeLinearity: 0.48 });
    },
  },
});
</script>

<template>
  <div class="m-0 block h-screen w-screen p-0">
    <l-map
      ref="map"
      :options="mapOptions"
      :zoom="0.1"
      :center="[0,0]"
      @ready="readyHandler"
    >
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        attribution="&copy; Stadia Maps, &copy; OpenMapTiles, &copy; OpenStreetMap contributors"
        layer-type="base"
        name="CyclOSM"
      />
      <template
        v-for="(marker, index) in importedMarkers"
        :key="index"
      >
        <template
          v-for="(position, positionIndex) in marker.positions"
          :key="positionIndex"
        >
          <l-marker
            :lat-lng="[position.lat, position.lng]"
            :icon="icon"
          >
            <l-popup>
              Name: <b>"{{ marker.name }}"</b><br>
              City: {{ marker.city }} <br>
              Category: {{ marker.category }}<br>
              Website: <a
                :href="marker.url"
                target="_blank"
              >click</a><br>
            </l-popup>
          </l-marker>
        </template>
      </template>
    </l-map>
  </div>
</template>

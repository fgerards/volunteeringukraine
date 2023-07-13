<script>
import { defineComponent } from 'vue';
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
    markerBgImageStyle(marker) {
      return `background-image: url(${marker.bgImg})`;
    },
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
            <l-popup
              class="popup-shadow flex h-[100%] shrink-0 items-stretch justify-center gap-[16px] rounded-[2px] bg-white px-[16px] py-[4px] max-sm:flex-col"
            >
              <div
                class="md: w-1/3 max-sm:w-full"
              >
                <img
                  :src="marker.bgImg"
                  class="h-full object-cover"
                >
              </div>
              <div class="w-2/3 py-3 leading-3">
                <h2 class="text-[18px] leading-5 text-blue-600">
                  {{ marker.name }}
                </h2>
                <p class="!m-0 !my-[4px] !p-0 text-gray-500">
                  {{ marker.category }}
                </p>
                <p class="!m-0 !my-[8px] !p-0">
                  <span class="text-base">Location:</span><br>
                  <span class="text-gray-500">{{ position.city }}</span>
                </p>
                <a
                  class="text-base !text-blue-600 underline"
                  :href="marker.url"
                  target="_blank"
                >Learn more</a>
              </div>
            </l-popup>
          </l-marker>
        </template>
      </template>
    </l-map>
  </div>
</template>

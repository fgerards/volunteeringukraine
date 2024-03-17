<script>
import { defineComponent } from 'vue';
import L from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LGeoJson,
  LControlZoom,
} from '@vue-leaflet/vue-leaflet';
import markerData from '../assets/markers.json';
import ukraineBorderGeoJson from '../assets/stanford-nv937bq8361-geojson.json';

export default defineComponent({
  name: 'ProjectMap',
  components: {
    LControlZoom,
    LPopup,
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
  data() {
    return {
      styleFunction: this.getStyle(0),
      mapOptions: {
        zoomSnap: 0.85,
        zoomControl: false,
      },
      tileUrl:
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      tileLayerOptions: {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v9', // You'll need to change this to the style you want
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoiZnJhbmtnNzQiLCJhIjoiY2xrNWkxcG85MDFyejNkbWR4c3kxbmh2cyJ9.6inWsEyBxcPF6YYxgR3FkA', // Your Mapbox access token
      },
      importedMarkers: markerData,
      ukrBorders: ukraineBorderGeoJson,
      icon: L.icon({
        iconUrl: 'images/material-symbols_location-on.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        iconRetinaUrl: 'images/material-symbols_location-on-2x.png',
        shadowUrl: 'images/marker-shadow.png',
        shadowSize: [35, 35],
        shadowAnchor: [17, 35],
        popupAnchor: [1, -16],
      }),
    };
  },
  methods: {
    getStyle(opacity = 0, fillOpacity = 0) {
      return () => ({
        weight: 1.5,
        color: '#474eff',
        opacity,
        fillColor: '#ffcc00',
        fillOpacity,
      });
    },
    markerBgImageStyle(marker) {
      return `background-image: url(${marker.bgImg})`;
    },
    async readyHandler() {
      const lBounds = [
        [52.5, 21],
        [44.5, 41],
      ];
      const map = this.$refs.map.leafletObject;
      this.styleFunction = this.getStyle(0, 0.05);
      map.flyToBounds(lBounds, { duration: 0.6, easeLinearity: 0.48 });
      setTimeout(() => {
        this.styleFunction = this.getStyle(1, 0.15);
      }, 600);
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
      :center="[0, 0]"
      @ready="readyHandler"
    >
      <l-control-zoom position="topright" />
      <l-tile-layer
        :url="tileUrl"
        :options="tileLayerOptions"
      />
      <l-geo-json
        :geojson="ukrBorders"
        :options-style="styleFunction"
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
            v-if="position.show === true"
            :lat-lng="[position.lat, position.lng]"
            :icon="icon"
          >
            <l-popup
              class="popup-shadow flex h-[100%] min-w-[300px] shrink-0 items-stretch justify-center gap-[16px] rounded-[2px] bg-white px-[16px] py-[4px] max-sm:flex-col"
            >
              <div class="flex max-sm:w-full md:w-1/3">
                <img
                  :src="marker.bgImg"
                  class="object-cover"
                  alt="backgroundImage"
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

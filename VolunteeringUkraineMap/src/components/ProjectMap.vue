<script>
import { defineComponent } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup,
} from '@vue-leaflet/vue-leaflet';
import markerData from '../assets/markers.json';

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl();
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/dist/images/marker-icon-2x.png',
  iconUrl: '/images/dist/images/marker-icon.png',
  shadowUrl: '/images/dist/images/marker-shadow.png',
});

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
      <l-marker
        v-for="(singleMarker, idx) in importedMarkers"
        :key="idx"
        :lat-lng="[singleMarker.lat, singleMarker.lng]"
      >
        <l-popup>
          Name: <b>"{{ singleMarker.name }}"</b><br>
          City: {{ singleMarker.city }} <br>
          Category: Teaching English to refugee children<br>
          Website: <a
            :href="singleMarker.url"
            target="_blank"
          >click</a><br>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

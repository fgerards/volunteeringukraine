<script>
import { defineComponent } from 'vue';
// import { GoogleMap, Marker } from 'vue3-google-map';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

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
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    // const center = { lat: 49.2117435, lng: 31.8449559 };
    return {
      zoom: 6.5,
      bounds: [48.5, 29.5],
      markerCoords: { lat: 49.989256, lng: 36.249083 },
    };
  },
});
</script>

<template>
  <div style="height:85vw; width:100vw">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:bounds="bounds"
      :center="[49.2117435, 31.8449559]"
    >
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="CyclOSM"
      />
      <l-marker
        :lat-lng="markerCoords"
      />
    </l-map>
  </div>
</template>

<style></style>

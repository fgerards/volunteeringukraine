<script>
import { defineComponent } from 'vue';
import { GoogleMap } from 'vue3-google-map';

export default defineComponent({
  name: 'ProjectMap',
  components: { GoogleMap },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    return { center };
  },
});
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<style scoped>

</style>
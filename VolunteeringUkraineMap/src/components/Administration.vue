<script>
import { defineComponent } from 'vue';
import markerData from '../assets/markers.json';

export default defineComponent({
  name: 'Administration',
  data() {
    return {
      importedMarkers: markerData,
    };
  },
});
</script>

<template>
  <div class="flex p-3">
    <form
      class="admin-form"
      v-bind="importedMarkers"
    >
      <fieldset
        v-for="(marker, markerIndex) in importedMarkers"
        :key="markerIndex"
      >
        <div class="mb-8">
          <h2
            class="mb-2 font-bold"
          >
            Project name: {{ marker.name }}
          </h2>
          Name:
          <input
            class="border-2 p-1"
            type="text"
            placeholder="marker.name"
            :value="marker.name"
          >
          <p
            class="mt-3"
          >
            URL:
            <input
              class="w-11/12 rounded-lg border-2 p-1"
              type="text"
              :value="marker.url"
            >
          </p>
          <div class="m-6">
            Positions
            <p
              v-for="(position,posIndex) in marker.positions"
              :key="posIndex"
              class="p-2"
            >
              City
              <input
                class="border-2 p-1"
                type="text"
                :value="position.city"
              >Lat
              <input
                class="border-2 p-1"
                type="text"
                :value="position.lat"
              >Lng
              <input
                class="border-2 p-1"
                type="text"
                :value="position.lng"
              >
              <input
                type="checkbox"
                class="mx-2 border-2"
                :checked="position.show"
              >Active
            </p>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>

</style>

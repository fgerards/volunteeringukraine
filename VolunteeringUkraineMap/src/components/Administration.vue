<script>
import { defineComponent, reactive } from 'vue';
import markerData from '../assets/markers.json';

export default defineComponent({
  name: 'Administration',
  setup() {
    const state = reactive({
      markers: [],
    });
    state.markers = markerData;
    return { state };
  },
  methods: {
    writeToFile(formData) {
      console.log(`form data: ${formData}`);
    },
  },
});
</script>

<template>
  <div class="flex p-3">
    <form
      class="admin-form"
    >
      <fieldset
        v-for="(marker, markerIndex) in state.markers"
        :key="markerIndex"
        class="mb-12"
      >
        <h2
          class="font-bold"
        >
          Project name: {{ marker.name }}
        </h2>
        <p class="mt-4">
          Name:
          <input
            v-model="marker.name"
            class="w-1/3 rounded-lg border-2 px-2 py-1"
            type="text"
            placeholder="marker.name"
            @change="writeToFile(marker.name)"
          >
        </p>
        <p
          class="mt-4"
        >
          URL:
          <input
            v-model="marker.url"
            class="ml-3 w-11/12 rounded-lg border-2 p-1"
            type="text"
          >
        </p>
        <div class="mx-6 my-4 w-full">
          <h3 class="mb-2 font-semibold italic">
            Project locations
          </h3>
          <p
            v-for="(position,posIndex) in marker.positions"
            :key="posIndex"
            class="mb-2 scale-90 px-4"
          >
            City
            <input
              v-model="position.city"
              class="mx-2 w-1/4 border-2 px-1"
              type="text"
            >Lat
            <input
              v-model="position.lat"
              class="mx-2 border-2 px-1"
              type="text"
            >Lng
            <input
              v-model="position.lng"
              class="mx-1 border-2 px-1"
              type="text"
              @change="writeToFile(state.markers[1])"
            >
            <input
              v-model="position.show"
              type="checkbox"
              class="mx-2 border-2"
              :checked="position.show"
            >Active
          </p>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>

</style>

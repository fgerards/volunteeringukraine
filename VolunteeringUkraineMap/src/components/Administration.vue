<script>
import {
  defineComponent, reactive, computed, watch, onMounted,
} from 'vue';
import axios from 'axios';
import markerData from '../assets/markers.json';
import Login from './Login.vue';

export default defineComponent({
  name: 'Administration',
  components: {
    Login,
  },
  setup() {
    const state = reactive({
      markers: markerData,
      isAuthenticated: false,
      newMarker: {
        name: '',
        url: '',
        positions: [],
      },
      newPosition: {
        city: '',
        lat: '',
        lng: '',
        show: false,
      },
    });

    const formData = computed(() => JSON.stringify(state.markers, null, 2));

    watch(
      () => state.markers,
      (newMarkers) => {
        console.log(`Markers updated: ${JSON.stringify(newMarkers)}`);
      },
      { deep: true },
    );

    onMounted(() => {
      state.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    });

    return { state, formData };
  },
  methods: {
    async writeToFile() {
      try {
        const response = await axios.post('/.netlify/functions/saveMarkers', this.state.markers);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error saving markers:', error);
      }
    },
    handleLoginSuccess() {
      this.state.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.state.isAuthenticated = false;
    },
    addNewMarker() {
      if (this.state.newMarker.name && this.state.newMarker.url) {
        this.state.markers.push({ ...this.state.newMarker });
        this.resetNewMarker();
      }
    },
    resetNewMarker() {
      this.state.newMarker = { name: '', url: '', positions: [] };
    },
    addNewPositionToNewMarker() {
      if (this.state.newPosition.city && this.state.newPosition.lat && this.state.newPosition.lng) {
        this.state.newMarker.positions.push({ ...this.state.newPosition });
        this.resetNewPosition();
      }
    },
    resetNewPosition() {
      this.state.newPosition = {
        city: '', lat: '', lng: '', show: false,
      };
    },
    addNewPositionToExistingMarker(marker) {
      marker.positions.push({
        city: '', lat: '', lng: '', show: false,
      });
    },
    deletePosition(markerIndex, posIndex) {
      this.state.markers[markerIndex].positions.splice(posIndex, 1);
    },
  },
});
</script>

<template>
  <div class="flex p-3">
    <Login
      v-if="!state.isAuthenticated"
      @login-success="handleLoginSuccess"
    />
    <div v-else>
      <button @click="logout">
        Logout
      </button>
      <form class="admin-form">
        <div class="mb-12">
          <h2 class="font-bold">
            Add New Location
          </h2>
          <p class="mt-4">
            Name:
            <input
              v-model="state.newMarker.name"
              class="w-1/3 rounded-lg border-2 px-2 py-1"
              type="text"
              placeholder="Enter project name"
            >
          </p>
          <p class="mt-4">
            URL:
            <input
              v-model="state.newMarker.url"
              class="ml-3 w-11/12 rounded-lg border-2 p-1"
              type="text"
              placeholder="Enter project URL"
            >
          </p>
          <div class="mx-6 my-4 w-full">
            <h3 class="mb-2 font-semibold italic">
              Project locations
            </h3>
            <p
              v-for="(position, posIndex) in state.newMarker.positions"
              :key="posIndex"
              class="mb-2 scale-90 px-4"
            >
              City: {{ position.city }} | Lat: {{ position.lat }} | Lng: {{ position.lng }} | Active: {{ position.show }}
            </p>
            <p class="mb-2 scale-90 px-4">
              <input
                v-model="state.newPosition.city"
                class="mx-2 w-1/4 border-2 px-1"
                type="text"
                placeholder="City"
              >
              <input
                v-model="state.newPosition.lat"
                class="mx-2 border-2 px-1"
                type="text"
                placeholder="Lat"
              >
              <input
                v-model="state.newPosition.lng"
                class="mx-2 border-2 px-1"
                type="text"
                placeholder="Lng"
              >
              <input
                v-model="state.newPosition.show"
                type="checkbox"
                class="mx-2 border-2"
              > Active
              <button
                type="button"
                @click="addNewPositionToNewMarker"
              >
                Add Location
              </button>
            </p>
          </div>
          <button
            type="button"
            @click="addNewMarker"
          >
            Add New Location
          </button>
        </div>

        <fieldset
          v-for="(marker, markerIndex) in state.markers"
          :key="markerIndex"
          class="mb-12"
        >
          <h2 class="font-bold">
            Project name: {{ marker.name }}
          </h2>
          <p class="mt-4">
            Name:
            <input
              v-model="marker.name"
              class="w-1/3 rounded-lg border-2 px-2 py-1"
              type="text"
            >
          </p>
          <p class="mt-4">
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
              v-for="(position, posIndex) in marker.positions"
              :key="posIndex"
              class="mb-2 scale-90 px-4"
            >
              City:
              <input
                v-model="position.city"
                class="mx-2 w-1/4 border-2 px-1"
                type="text"
              > Lat:
              <input
                v-model="position.lat"
                class="mx-2 border-2 px-1"
                type="text"
              > Lng:
              <input
                v-model="position.lng"
                class="mx-2 border-2 px-1"
                type="text"
              >
              <input
                v-model="position.show"
                type="checkbox"
                class="mx-2 border-2"
              > Active
              <button
                type="button"
                @click="deletePosition(markerIndex, posIndex)"
              >
                Delete
              </button>
            </p>
            <button
              type="button"
              @click="addNewPositionToExistingMarker(marker)"
            >
              Add New Project Location
            </button>
          </div>
        </fieldset>
        <button
          type="button"
          @click="writeToFile"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add styles as needed */
</style>

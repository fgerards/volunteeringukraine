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
  <div class="min-h-screen bg-gray-100 p-6">
    <Login
      v-if="!state.isAuthenticated"
      @login-success="handleLoginSuccess"
    />
    <div
      v-else
      class="container mx-auto rounded-lg bg-white p-6 shadow-md"
    >
      <button
        class="mb-4 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        @click="logout"
      >
        Logout
      </button>
      <form class="admin-form">
        <div class="mb-12">
          <h2 class="mb-4 text-xl font-bold">
            Add New Location
          </h2>
          <p class="mt-4">
            Name:
            <input
              v-model="state.newMarker.name"
              class="mb-4 w-full rounded-lg border-gray-300 px-4 py-2"
              type="text"
              placeholder="Enter project name"
            >
          </p>
          <p class="mt-4">
            URL:
            <input
              v-model="state.newMarker.url"
              class="mb-4 w-full rounded-lg border-gray-300 px-4 py-2"
              type="text"
              placeholder="Enter project URL"
            >
          </p>
          <div class="mt-6">
            <h3 class="mb-2 font-semibold italic">
              Project locations
            </h3>
            <div
              v-for="(position, posIndex) in state.newMarker.positions"
              :key="posIndex"
              class="mb-2"
            >
              <p class="mb-2 flex items-center">
                City: {{ position.city }} | Lat: {{ position.lat }} | Lng: {{ position.lng }} | Active: {{ position.show }}
              </p>
            </div>
            <div class="mb-4 flex items-center">
              <input
                v-model="state.newPosition.city"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="City"
              >
              <input
                v-model="state.newPosition.lat"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="Lat"
              >
              <input
                v-model="state.newPosition.lng"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="Lng"
              >
              <input
                v-model="state.newPosition.show"
                type="checkbox"
                class="mb-2 mr-2"
              > Active
              <button
                type="button"
                class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                @click="addNewPositionToNewMarker"
              >
                Add Location
              </button>
            </div>
          </div>
          <button
            type="button"
            class="mt-4 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
            @click="addNewMarker"
          >
            Add New Location
          </button>
        </div>

        <fieldset
          v-for="(marker, markerIndex) in state.markers"
          :key="markerIndex"
          class="mb-12 rounded-lg border p-4 shadow-sm"
        >
          <h2 class="mb-4 text-xl font-bold">
            Project name: {{ marker.name }}
          </h2>
          <p class="mt-4">
            Name:
            <input
              v-model="marker.name"
              class="mb-4 w-full rounded-lg border-gray-300 px-4 py-2"
              type="text"
            >
          </p>
          <p class="mt-4">
            URL:
            <input
              v-model="marker.url"
              class="mb-4 w-full rounded-lg border-gray-300 px-4 py-2"
              type="text"
            >
          </p>
          <div class="mt-6">
            <h3 class="mb-2 font-semibold italic">
              Project locations
            </h3>
            <div
              v-for="(position, posIndex) in marker.positions"
              :key="posIndex"
              class="mb-4 flex items-center"
            >
              <input
                v-model="position.city"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="City"
              >
              <input
                v-model="position.lat"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="Lat"
              >
              <input
                v-model="position.lng"
                class="mb-2 mr-2 flex-1 rounded-lg border-gray-300 px-4 py-2"
                type="text"
                placeholder="Lng"
              >
              <input
                v-model="position.show"
                type="checkbox"
                class="mb-2 mr-2"
              > Active
              <button
                type="button"
                class="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                @click="deletePosition(markerIndex, posIndex)"
              >
                Delete
              </button>
            </div>
            <button
              type="button"
              class="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              @click="addNewPositionToExistingMarker(marker)"
            >
              Add New Project Location
            </button>
          </div>
        </fieldset>
        <button
          type="button"
          class="mt-4 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
          @click="writeToFile"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>

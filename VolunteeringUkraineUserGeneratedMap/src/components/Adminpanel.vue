<!-- src/components/Admin.vue -->
<template>
  <div v-if="isAdmin">
    <!-- Admin functionalities here -->
    <h1>Admin Panel</h1>
    <form @submit.prevent="addMarker">
      <label for="lat">Latitude:</label>
      <input type="number" id="lat" v-model="newMarker.lat" step="any" required />

      <label for="lng">Longitude:</label>
      <input type="number" id="lng" v-model="newMarker.lng" step="any" required />

      <button type="submit">Add Marker</button>
    </form>
  </div>
  <div v-else>
    <button @click="signIn">Sign In</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { auth } from '../firebaseConfig';

const isAdmin = ref(false);
const newMarker = ref({ lat: 0, lng: 0 });

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Check if the user is an admin (replace with your own logic)
    isAdmin.value = user.email === 'admin@example.com';
  } else {
    isAdmin.value = false;
  }
});

const db = getDatabase();
const markersRef = dbRef(db, 'markers');

const addMarker = () => {
  // Add new marker to Firebase Realtime Database
  push(markersRef, newMarker.value);
  // Reset the form
  newMarker.value = { lat: 0, lng: 0 };
};

const signIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

signIn().catch((error) => {
  console.error("Sign-in error", error);
});
</script>

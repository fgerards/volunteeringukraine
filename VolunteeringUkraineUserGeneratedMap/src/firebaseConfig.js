// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-eFJFdEXQ6yynTcCXRxRwMQwFEMuBZyU",
    databaseURL: "https://volunteeringukraine-default-rtdb.europe-west1.firebasedatabase.app",
    authDomain: "volunteeringukraine.firebaseapp.com",
    projectId: "volunteeringukraine",
    storageBucket: "volunteeringukraine.appspot.com",
    messagingSenderId: "1058073055493",
    appId: "1:1058073055493:web:f5210461c09d5ee2e3e76c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

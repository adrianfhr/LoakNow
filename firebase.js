// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZsCOVdC_ssB72iA5acNqRSB4y-z-_o_Y",
  authDomain: "ppam-loaknow-f6d20.firebaseapp.com",
  projectId: "ppam-loaknow-f6d20",
  storageBucket: "ppam-loaknow-f6d20.appspot.com",
  messagingSenderId: "69615376531",
  appId: "1:69615376531:web:1e266a5c9a3153150a9566",
  measurementId: "G-VRK29S2QR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);  // Tambahkan inisialisasi Firestore
const messaging = getMessaging(app);  // Tambahkan inisialisasi Firebase Cloud Messaging

export { app, auth, firestore, messaging };

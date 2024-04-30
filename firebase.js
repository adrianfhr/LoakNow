// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default { app, auth}
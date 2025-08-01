// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCylNnv3fj3Pu70B702PFb67-gGEBWArs",
  authDomain: "netflixgpt-82cbb.firebaseapp.com",
  projectId: "netflixgpt-82cbb",
  storageBucket: "netflixgpt-82cbb.firebasestorage.app",
  messagingSenderId: "78667723259",
  appId: "1:78667723259:web:46e1d36c554949bbe95b5e",
  measurementId: "G-5X6P1EB9D5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

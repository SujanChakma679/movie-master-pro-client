// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl-my6f_jq_PnJ6sD8leqIPsUuHdXRgGo",
  authDomain: "movie-master-pro-75f50.firebaseapp.com",
  projectId: "movie-master-pro-75f50",
  storageBucket: "movie-master-pro-75f50.firebasestorage.app",
  messagingSenderId: "417887453704",
  appId: "1:417887453704:web:0eb9629ddbc1c7d63c47bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);
// api/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGklLImZn_LHbCd4CX4iRDOM7kyJAWvuY",
  authDomain: "social-media-24da8.firebaseapp.com",
  projectId: "social-media-24da8",
  storageBucket: "social-media-24da8.appspot.com",
  messagingSenderId: "779544379937",
  appId: "1:779544379937:web:58d3a30c6ea2bbd836d960",
  measurementId: "G-5FX8SPXRXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };

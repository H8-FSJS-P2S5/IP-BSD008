// server/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

const storage = firebase.storage();

export { storage, firebase as default };

// Path: server/routes/authRoutes.js

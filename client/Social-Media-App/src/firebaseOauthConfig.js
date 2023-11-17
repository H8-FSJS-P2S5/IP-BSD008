// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
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
  appId: "1:779544379937:web:e4a2e265445fe3b736d960",
  measurementId: "G-4VY7V5JYFY",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth, GithubAuthProvider };

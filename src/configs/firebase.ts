// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWHESA4QekDchXrg_Ivuz-CWWu9XKLvVw",
  authDomain: "react-weather-forecast-5842d.firebaseapp.com",
  projectId: "react-weather-forecast-5842d",
  storageBucket: "react-weather-forecast-5842d.appspot.com",
  messagingSenderId: "1021183724220",
  appId: "1:1021183724220:web:40f7bccaf9a9e21c1e1eb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

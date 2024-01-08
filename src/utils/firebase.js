// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB46GnAQHSDZo8bkv-Z_QF2rFszIIqc-9Y",
  authDomain: "netflixgpt-9312d.firebaseapp.com",
  projectId: "netflixgpt-9312d",
  storageBucket: "netflixgpt-9312d.appspot.com",
  messagingSenderId: "139313551244",
  appId: "1:139313551244:web:b224c0b279acf0b5a628a9",
  measurementId: "G-SQ7RZPY4NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

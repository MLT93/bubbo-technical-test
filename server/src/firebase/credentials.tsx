// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAToR_UdBHGNTF-vYRfdUhVkOpbK5vA7pA",
  authDomain: "bubbo-technical-test-c3751.firebaseapp.com",
  projectId: "bubbo-technical-test-c3751",
  storageBucket: "bubbo-technical-test-c3751.appspot.com",
  messagingSenderId: "781348287499",
  appId: "1:781348287499:web:aa48d90b0054688031830e",
  measurementId: "G-B2RJREX0MB"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analyticsFirebase = getAnalytics(appFirebase);

export { appFirebase, analyticsFirebase };

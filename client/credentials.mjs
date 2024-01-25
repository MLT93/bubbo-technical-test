// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjv_uUlf3Am-pxMklf_vR_vOf-rH6NcgY",
  authDomain: "bubbo-technical-test-8ca32.firebaseapp.com",
  projectId: "bubbo-technical-test-8ca32",
  storageBucket: "bubbo-technical-test-8ca32.appspot.com",
  messagingSenderId: "708058228376",
  appId: "1:708058228376:web:0a1ad9f7f0c1cbf20992ed"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export { appFirebase };

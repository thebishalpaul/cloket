// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXRLAw8P-5_UMtZrdX-IC8qYn4HEAH6ck",
  authDomain: "cloket-2b61f.firebaseapp.com",
  projectId: "cloket-2b61f",
  storageBucket: "cloket-2b61f.appspot.com",
  messagingSenderId: "623486882691",
  appId: "1:623486882691:web:de1d41c37ef122937a1cb6",
  measurementId: "G-5XDZWST497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

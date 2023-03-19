// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider , getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfNto4T0G_9mzWThPWUvMsIwJCO4oNe-I",
  authDomain: "vidspace-51463.firebaseapp.com",
  projectId: "vidspace-51463",
  storageBucket: "vidspace-51463.appspot.com",
  messagingSenderId: "568012731188",
  appId: "1:568012731188:web:01ca1956d509ac7ecc6b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const Auth = getAuth()
export default app

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // If you plan to use Firebase Auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIpCa2igjeY51Btc8HGTf6Gmn64X0LWDk",
  authDomain: "suparshwamarketing.firebaseapp.com",
  projectId: "suparshwamarketing",
  storageBucket: "suparshwamarketing.firebasestorage.app",
  messagingSenderId: "300745944934",
  appId: "1:300745944934:web:0d38954f065fe5740e22a7",
  measurementId: "G-T9H5WWK3EG"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
const auth = getAuth(app); // If using auth

export { app, db, auth };

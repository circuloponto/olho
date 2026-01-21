// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoGEbgkKJpZ4BtrWfB2ZqtOw3CGWp7rxI",
  authDomain: "olho-8902b.firebaseapp.com",
  projectId: "olho-8902b",
  storageBucket: "olho-8902b.firebasestorage.app",
  messagingSenderId: "533962017190",
  appId: "1:533962017190:web:526facf877de6d7afae767",
  measurementId: "G-9EJBJ2SC6T"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

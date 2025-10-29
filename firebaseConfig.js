// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqMhFyVCoayQ1J-x3SMu1hn9WHJhe0ajQ",
  authDomain: "lumigram-ed6e4.firebaseapp.com",
  projectId: "lumigram-ed6e4",
  storageBucket: "lumigram-ed6e4.firebasestorage.app",
  messagingSenderId: "417069598833",
  appId: "1:417069598833:web:198e81b7ec1478be74f3d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
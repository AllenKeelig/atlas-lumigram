import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqMhFyVCoayQ1J-x3SMu1hn9WHJhe0ajQ",
  authDomain: "lumigram-ed6e4.firebaseapp.com",
  projectId: "lumigram-ed6e4",
  storageBucket: "gs://lumigram-ed6e4.firebasestorage.app",
  messagingSenderId: "417069598833",
  appId: "1:417069598833:web:198e81b7ec1478be74f3d0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

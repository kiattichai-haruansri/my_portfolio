import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCFD3oFX76p9aDF20Mfm0JvPmJIOb3hL3Q",
  authDomain: "my-port-363ff.firebaseapp.com",
  projectId: "my-port-363ff",
  storageBucket: "my-port-363ff.appspot.com",
  messagingSenderId: "384333255392",
  appId: "1:384333255392:web:5bfd6b119638eb5db97685",
  measurementId: "G-KD8NWMFD94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

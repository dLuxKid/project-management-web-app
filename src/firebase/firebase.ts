import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5sUlNHjqD_YDBrm1zfjOdlOLTVk7GSts",
  authDomain: "hotelapp-f09e0.firebaseapp.com",
  projectId: "hotelapp-f09e0",
  storageBucket: "hotelapp-f09e0.appspot.com",
  messagingSenderId: "682244615537",
  appId: "1:682244615537:web:53a9e0c8453267c17c5ad0",
  measurementId: "G-BP1N17S6EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

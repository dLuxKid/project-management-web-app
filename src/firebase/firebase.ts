import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqJa3a03a32G8y6T7sgs8Gfl6xJWzXis4",
  authDomain: "collabor8-75718.firebaseapp.com",
  projectId: "collabor8-75718",
  storageBucket: "collabor8-75718.appspot.com",
  messagingSenderId: "90152451235",
  appId: "1:90152451235:web:1dd23ab6e66d5f8ce71316",
  measurementId: "G-CTE9W5FPKZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

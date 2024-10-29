import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-firebase-2.firebaseapp.com",
  projectId: "react-chat-firebase-2",
  storageBucket: "react-chat-firebase-2.appspot.com",
  messagingSenderId: "56772281367",
  appId: "1:56772281367:web:4b14cd140bf629c5e58852"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
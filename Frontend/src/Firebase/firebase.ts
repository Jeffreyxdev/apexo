// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDz-1m00Oex2rvL9Qlmb_HZAE8V4ceEBQ4",
  authDomain: "apexo-ai.firebaseapp.com",
  projectId: "apexo-ai",
  storageBucket: "apexo-ai.firebasestorage.app",
  messagingSenderId: "852713527633",
  appId: "1:852713527633:web:d6ad66f3a400a1308f1b70",
  measurementId: "G-D6QLVNHCVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db};
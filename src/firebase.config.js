import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABpXYqSFaCyvSouKcwzjkaGfWbkj_7UFo",
  authDomain: "learn-app-911bb.firebaseapp.com",
  projectId: "learn-app-911bb",
  storageBucket: "learn-app-911bb.appspot.com",
  messagingSenderId: "90408188150",
  appId: "1:90408188150:web:3fe461be9f51c9bca594d7",
  measurementId: "G-SZM5YWCQFY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);

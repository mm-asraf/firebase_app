import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "###################",
  authDomain: "##################",
  projectId: "###########",
  storageBucket: "###########",
  messagingSenderId: "#########",
  appId: "########################",
  measurementId: "##########",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);

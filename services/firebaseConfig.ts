import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd-r7bcJ1N25TYhYsKikXuDAkSO0hULi0",
    authDomain: "greenhub-cb6fc.firebaseapp.com",
    projectId: "greenhub-cb6fc",
    storageBucket: "greenhub-cb6fc.firebasestorage.app",
    messagingSenderId: "918872917460",
    appId: "1:918872917460:web:6ca67fa0f6359921294241",
    measurementId: "G-Y17Q0LCNP8"
  };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
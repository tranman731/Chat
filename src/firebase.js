import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSzlvCkXDAQIv9yjkMYjsXhx4z_sLsAKg",
  authDomain: "chat-732ba.firebaseapp.com",
  projectId: "chat-732ba",
  storageBucket: "chat-732ba.appspot.com",
  messagingSenderId: "546371589155",
  appId: "1:546371589155:web:ffe1d51b875335c7488d96"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
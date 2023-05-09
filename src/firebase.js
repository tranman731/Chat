import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSzlvCkXDAQIv9yjkMYjsXhx4z_sLsAKg",
  authDomain: "chat-732ba.firebaseapp.com",
  projectId: "chat-732ba",
  storageBucket: "chat-732ba.appspot.com",
  messagingSenderId: "546371589155",
  appId: "1:546371589155:web:ffe1d51b875335c7488d96",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDhI3Gyo2TJbBnz6tcwMddu_aLgbqedK5o",
//   authDomain: "chat-4eb6b.firebaseapp.com",
//   projectId: "chat-4eb6b",
//   storageBucket: "chat-4eb6b.appspot.com",
//   messagingSenderId: "101755094035",
//   appId: "1:101755094035:web:2840999720a682eaaeabe6"
// };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9qpSMMrJ_Jl9EBD4slUdiAV-hDiKLWq8",
  authDomain: "chatapp-fba53.firebaseapp.com",
  projectId: "chatapp-fba53",
  storageBucket: "chatapp-fba53.appspot.com",
  messagingSenderId: "211649689042",
  appId: "1:211649689042:web:1185d00072df5f34b0440b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB71h7E4KNRrRM8VA56zwkxcQ_sxdrCGsM",
  authDomain: "iponiq.firebaseapp.com",
  databaseURL: "https://iponiq-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iponiq",
  storageBucket: "iponiq.appspot.com",
  messagingSenderId: "804791323213",
  appId: "1:804791323213:web:59230d0ca88077de27aa04",
  measurementId: "G-12L8KEJV6N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
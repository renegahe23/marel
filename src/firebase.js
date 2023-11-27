// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJh6aw63f4EQsmgqKC0m8eP3MDAkIFjSs",
  authDomain: "marel-36ec0.firebaseapp.com",
  projectId: "marel-36ec0",
  storageBucket: "marel-36ec0.appspot.com",
  messagingSenderId: "656109153303",
  appId: "1:656109153303:web:b56306f54dfb746fcc0052",
  measurementId: "G-DJCJ06P3J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
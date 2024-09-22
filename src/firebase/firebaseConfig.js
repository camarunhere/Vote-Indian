// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzy3k0PDRqo-nHNkQtBd-1Wy7A35OyfKg",
  authDomain: "reactudemydb.firebaseapp.com",
  databaseURL: "https://reactudemydb-default-rtdb.firebaseio.com",
  projectId: "reactudemydb",
  storageBucket: "reactudemydb.appspot.com",
  messagingSenderId: "410378900224",
  appId: "1:410378900224:web:583e4df57e44b5f03959e5",
  measurementId: "G-5QT87J2RZF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const ReactUdemyDBstorage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPYh1_gps8iKgd_qy_oWOMe31r6tNvavk",
  authDomain: "e-commerce-b60fc.firebaseapp.com",
  projectId: "e-commerce-b60fc",
  storageBucket: "e-commerce-b60fc.appspot.com",
  messagingSenderId: "840430095737",
  appId: "1:840430095737:web:74f0355d5a32c43d6b33a8",
  measurementId: "G-H6HQCFSK7K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

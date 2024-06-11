// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref,child,get,set,update,remove } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeMU32FZIjFlodKGUmqJE57ufw6nHCXAE",
    authDomain: "softsync-e6b2d.firebaseapp.com",
    databaseURL: "https://softsync-e6b2d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "softsync-e6b2d",
    storageBucket: "softsync-e6b2d.appspot.com",
    messagingSenderId: "1086815429459",
    appId: "1:1086815429459:web:4baff486c32518dcf1f7a6",
    measurementId: "G-4DLNSR246R"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);

//export {app,auth};
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import {initializeApp} from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDIg-caiHVXZ0JIySRkGKSqYe9CNJpYtlE",
  authDomain: "rafif-iot.firebaseapp.com",
  projectId: "rafif-iot",
  storageBucket: "rafif-iot.appspot.com",
  messagingSenderId: "57266251985",
  appId: "1:57266251985:web:14066a2c1ae84053e87df0",
  databaseURL:
    "https://rafif-iot-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const rtdb = getDatabase(firebaseApp);
const auth = firebase.auth();

export { db, auth, rtdb };

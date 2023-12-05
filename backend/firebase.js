// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, get, set, push, query, orderByChild, equalTo, update, remove} from  "firebase/database"

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDeNWU7kd7WaN2dSZfIZcrMKXHHSeZbuE",
  authDomain: "scanslate-c1d3c.firebaseapp.com",
  projectId: "scanslate-c1d3c",
  storageBucket: "scanslate-c1d3c.appspot.com",
  messagingSenderId: "819875712364",
  appId: "1:819875712364:web:5903f97a0dd8ce4a85b749"
};

// Initialize Firebase with AsyncStorage for persistence
const firebase = initializeApp(firebaseConfig);
// const auth = getAuth()
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getDatabase()

export {firebase, auth, db, ref, get, set, push, query , orderByChild, equalTo, update, remove, createUserWithEmailAndPassword, signInWithEmailAndPassword}
/*
   This file sets up the backend for the applicaiton, which specifically initializes the firebase connection for database and authentication as well as exports some useful methods that can be used to interact with firebase 
*/
import {API_FIREBASE_KEY} from '@env'
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, get, set, push, query, orderByChild, equalTo, update, remove} from  "firebase/database"

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: API_FIREBASE_KEY,
  authDomain: "scanslate-c1d3c.firebaseapp.com",
  projectId: "scanslate-c1d3c",
  storageBucket: "scanslate-c1d3c.appspot.com",
  messagingSenderId: "819875712364",
  appId: "1:819875712364:web:5903f97a0dd8ce4a85b749"
};

// Initialize Firebase with AsyncStorage for persistence
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Initialize Firebase RealTime Database
const db = getDatabase()

export {firebase, auth, db, ref, get, set, push, query , orderByChild, equalTo, update, remove, createUserWithEmailAndPassword, signInWithEmailAndPassword}
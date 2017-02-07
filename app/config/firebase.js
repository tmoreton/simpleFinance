// Initialize Firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBzrVV0uAztaBi_YfE_CYFDhlt2uzLztvk",
  authDomain: "simplefinance-c886b.firebaseapp.com",
  databaseURL: "https://simplefinance-c886b.firebaseio.com",
  storageBucket: "simplefinance-c886b.appspot.com",
  messagingSenderId: "933965917553"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
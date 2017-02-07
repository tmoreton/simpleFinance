// Initialize Firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCAm9TWT0Lk2qTqdIPktJDUYXawSjHfDS4",
  authDomain: "test-9b9b8.firebaseapp.com",
  databaseURL: "https://test-9b9b8.firebaseio.com",
  storageBucket: "test-9b9b8.appspot.com",
  messagingSenderId: "335029587633"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
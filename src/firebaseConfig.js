import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBUzDLhea_bYJ0jUOT26Owyjpwnk2_pYDA",
    authDomain: "fastpay-personal.firebaseapp.com",
    databaseURL: "https://fastpay-personal.firebaseio.com",
    projectId: "fastpay-personal",
    storageBucket: "fastpay-personal.appspot.com",
    messagingSenderId: "548368219462",
    appId: "1:548368219462:web:2c717dfbaea99220ecb947",
    measurementId: "G-37C1J7JLME"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  export default firebase;
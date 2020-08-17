import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChNWeZMhy1cZ_RPcjzBYgoV_5fbA1vEX8",
  authDomain: "e-cuti-db056.firebaseapp.com",
  databaseURL: "https://e-cuti-db056.firebaseio.com",
  projectId: "e-cuti-db056",
  storageBucket: "e-cuti-db056.appspot.com",
  messagingSenderId: "355851861029",
  appId: "1:355851861029:web:574aee2dab2c5c185c93cc",
  measurementId: "G-FNT37820VH"
};

export default firebase.initializeApp(firebaseConfig);
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBlrpmeUV2DckBfbZiEKqGzy43OlQY-vc",
  authDomain: "e-cuti-53b10.firebaseapp.com",
  databaseURL: "https://e-cuti-53b10.firebaseio.com",
  projectId: "e-cuti-53b10",
  storageBucket: "e-cuti-53b10.appspot.com",
  messagingSenderId: "830315545153",
  appId: "1:830315545153:web:b2fdb92b097dd8d81f3cc0",
  measurementId: "G-FEPZ48V8RK"
};

export default firebase.initializeApp(firebaseConfig);
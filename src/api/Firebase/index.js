import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4M34jNb7-ELfr5fZKH0xJ9A1ofLHJEhY",
  authDomain: "e-cuti-5a43b.firebaseapp.com",
  databaseURL: "https://e-cuti-5a43b.firebaseio.com",
  projectId: "e-cuti-5a43b",
  storageBucket: "e-cuti-5a43b.appspot.com",
  messagingSenderId: "874192537964",
  appId: "1:874192537964:web:6949299f1e6676aedc4b49",
  measurementId: "G-YFH5P5QN8X"
};
export default firebase.initializeApp(firebaseConfig);
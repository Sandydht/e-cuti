import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4M34jNb7-ELfr5fZKH0xJ9A1ofLHJEhY",
  authDomain: "e-cuti-5a43b.firebaseapp.com",
  databaseURL: "https://e-cuti-5a43b.firebaseio.com",
  projectId: "e-cuti-5a43b",
  storageBucket: "e-cuti-5a43b.appspot.com",
  messagingSenderId: "874192537964",
  appId: "1:874192537964:web:049f328500e651e5dc4b49",
  measurementId: "G-S823WNSJ20"
};

export default firebase.initializeApp(firebaseConfig);
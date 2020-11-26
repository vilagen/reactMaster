import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

// const firebase_apikey = process.env.REACT_APP_FIREBASE_KEY;

const config = {
  apiKey: "AIzaSyB6NhxZPaDYcdjd9JEWPHxGWVufMgxUB6c",
  authDomain: "crwn-db-91ebb.firebaseapp.com",
  databaseURL: "https://crwn-db-91ebb.firebaseio.com",
  projectId: "crwn-db-91ebb",
  storageBucket: "crwn-db-91ebb.appspot.com",
  messagingSenderId: "1035478137107",
  appId: "1:1035478137107:web:f0fcd003340ddc3bb982e6",
  measurementId: "G-G6JKJ5G1PK"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
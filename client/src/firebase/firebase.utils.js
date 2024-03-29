import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebase_apikey = process.env.REACT_APP_FIREBASE_KEY;

const config = {
  apiKey: "AIzaSyB6NhxZPaDYcdjd9JEWPHxGWVufMgxUB6c",
  authDomain: "crwn-db-91ebb.firebaseapp.com",
  databaseURL: "https://crwn-db-91ebb.firebaseio.com",
  projectId: "crwn-db-91ebb",
  storageBucket: "crwn-db-91ebb.appspot.com",
  messagingSenderId: "1035478137107",
  appId: "1:1035478137107:web:f0fcd003340ddc3bb982e6",
  measurementId: "G-G6JKJ5G1PK",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user. ", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

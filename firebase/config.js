import fb from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebase = !fb.apps.length
  ? fb.initializeApp(clientCredentials)
  : fb.app();

export const readFirestore = async () => {
  let data = [];

  try {
    await firebase
      .firestore()
      .collection("myCollection")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
      });
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const writeFirestore = (movie) => {
  try {
    firebase.firestore().collection("myCollection").doc(movie.id).set({
      movie,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFirestore = (id) => {
  try {
    firebase.firestore().collection("myCollection").doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

export const firestore = firebase.firestore();

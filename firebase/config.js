import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}
export { firebase };
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();

// export const writeFirestore = (movie, uid) => {
//   const time = firebase.firestore.Timestamp.fromMillis(new Date());
//   const createdAt = time.seconds;
//   try {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .collection("lists")
//       .doc(movie.id)
//       .set({
//         attributes: {
//           posterImage: {
//             original: movie.attributes.posterImage.original,
//           },
//           titles: {
//             ja_jp: movie.attributes.titles.ja_jp,
//           },
//           averageRating: movie.attributes.averageRating,
//         },
//         id: movie.id,
//         createdAt,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const removeFirestore = (id, uid) => {
//   try {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .collection("lists")
//       .doc(id)
//       .delete();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const editFireStore = (uid, data) => {
//   try {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .collection("profile")
//       .doc("detail")
//       .set({
//         name: data.name,
//         location: data.location,
//         genre: data.genre,
//         recommend: data.recommend,
//         image: data.image,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

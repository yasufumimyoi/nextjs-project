import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../firebase/config";
import { setList } from "../redux/movie";
import { signIn, setProfile, addLogin } from "../redux/user";

const Auth = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const fetchMovieData = async (users) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(users)
        .collection("lists")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            dispatch(setList(doc.data()));
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfileData = async (users) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(users)
        .collection("profile")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            dispatch(setProfile(doc.data()));
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!users) {
          fetchMovieData(user.uid);
          fetchProfileData(user.uid);
          if (!user.isAnonymous) {
            dispatch(addLogin());
          }
        }
        dispatch(signIn(user.uid));
      } else {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            firebase.auth().signInAnonymously();
          });
      }
    });
  }, [users]);

  return <div></div>;
};

export default Auth;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../firebase/config";
import { fetchMovieData } from "../redux/movie";
import { setUid, setLogin, fetchProfileData } from "../redux/user";

const Auth = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const dataRef = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("lists")
          .get();
        if (!uid && !dataRef.empty) {
          dispatch(fetchMovieData(user.uid));
          dispatch(fetchProfileData(user.uid));
          if (!user.isAnonymous) {
            dispatch(setLogin());
          }
        }
        dispatch(setUid(user.uid));
      } else {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            firebase.auth().signInAnonymously();
          });
      }
    });
  }, [uid]);

  return <></>;
};

export default Auth;

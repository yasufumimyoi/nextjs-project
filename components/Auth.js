import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/config";
import { fetchMovieData } from "../redux/movie";
import { setUid, isLogin, fetchProfileData } from "../redux/user";

const Auth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, isAnonymous } = user;
        dispatch(setUid(uid));
        dispatch(fetchMovieData(uid));
        dispatch(fetchProfileData(uid));
        if (!isAnonymous) {
          dispatch(isLogin());
        }
      } else {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            firebase.auth().signInAnonymously();
          });
      }
    });
  }, []);

  return <></>;
};

export default Auth;

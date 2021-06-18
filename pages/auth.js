import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/config";
import {
  UserIcon,
  LogoutIcon,
  FilmIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";

const firebaseAuthConfig = {
  signInSuccessUrl: "/",

  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div>
      {renderAuth ? (
        <div className="flex justify-center items-center h-screen">
          <div>
            <a className="flex items-center mb-7">
              <FilmIcon className="h-8 mr-2 text-purple-500 " />
              <div className="text-2xl font-bold ">Anime Tracker</div>
            </a>
            <StyledFirebaseAuth
              uiConfig={firebaseAuthConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FirebaseAuth;

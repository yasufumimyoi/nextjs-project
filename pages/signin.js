import Link from "next/link";
import { useRouter } from "next/router";
import {
  firebase,
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../firebase/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/schemas";
import { useDispatch } from "react-redux";
import { isLogin } from "../redux/user";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handelExistingUserEmailLogin = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(isLogin());
      await router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelExistingUserGoogleLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(() => {
          dispatch(isLogin());
          router.push("/");
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelExistingUserGithubLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(githubProvider)
        .then(() => {
          dispatch(isLogin());
          router.push("/");
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelExistingUserTwitterLogin = () => {
    try {
      firebase
        .auth()
        .signInWithPopup(twitterProvider)
        .then(() => {
          dispatch(isLogin());
          router.push("/");
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mt-20 mb-20 sm:flex sm:justify-around">
      <div className="mb-10">
        <h2 className="font-bold text-2xl mb-8 text-center">Sign in!!</h2>
        <div className="flex justify-around w-80 mx-auto mb-8">
          <button
            className="focus:outline-none"
            onClick={handelExistingUserGoogleLogin}
          >
            <img
              src="google-icon.svg"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
            />
          </button>
          <button
            className="focus:outline-none"
            onClick={handelExistingUserTwitterLogin}
          >
            <img
              src="twitter.svg"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
            />
          </button>
          <button
            className="focus:outline-none"
            onClick={handelExistingUserGithubLogin}
          >
            <img
              src="github-icon.svg"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
            />
          </button>
        </div>
        <form
          className="flex flex-col w-80 mx-auto sm:mx-0"
          onSubmit={handleSubmit(handelExistingUserEmailLogin)}
        >
          {errors.email && (
            <p className="text-red-500 text-sm text-center">
              {errors.email.message}
            </p>
          )}
          <input
            className={`border rounded mb-6 px-8 py-2 outline-none ${
              errors.email ? "border-red-400" : "text-base"
            }`}
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-center">
              {errors.password.message}
            </p>
          )}
          <input
            className={`border rounded mb-6 px-8 py-2 outline-none ${
              errors.password ? "border-red-400" : "text-base"
            }`}
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
          <Link href="/reset">
            <a className="text-center text-xs mb-6 cursor-pointer hover:opacity-50 transition duration-300">
              パスワードをお忘れの方はこちらへ
            </a>
          </Link>
          <button className="text-white bg-purple-500 rounded px-8 py-2 focus:outline-none">
            Sigin in
          </button>
        </form>
      </div>
      <div className="w-80 mx-auto sm:mx-0">
        <h2 className="font-bold text-2xl mb-8 text-center">Sign up!!</h2>
        <Link href="/signup">
          <a className="text-white bg-purple-500 rounded px-8 py-2 block text-center">
            初めての方はこちらへ
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

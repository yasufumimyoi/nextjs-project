import Link from "next/link";
import { useRouter } from "next/router";
import {
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../firebase/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/schemas";
import { useDispatch } from "react-redux";
import { isLogin } from "../redux/user";
import { firebase } from "../firebase/config";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createAccountWithEmail = async ({ email, password }) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch(isLogin());
      router.push("/");
    } catch (error) {
      router.push("/error");
      console.error(error.message);
    }
  };

  const createAccountWithGoogle = async () => {
    try {
      await firebase.auth().currentUser.linkWithPopup(googleProvider);
      dispatch(isLogin());
      router.push("/");
    } catch (error) {
      router.push("/error");
      console.error(error.message);
    }
  };

  const createAccountWithGithub = async () => {
    try {
      await firebase.auth().currentUser.linkWithPopup(githubProvider);
      dispatch(isLogin());
      router.push("/");
    } catch (error) {
      router.push("/error");
      console.error(error.message);
    }
  };

  const createAccountWithTwitter = async () => {
    try {
      await firebase.auth().currentUser.linkWithPopup(twitterProvider);
      dispatch(isLogin());
      router.push("/");
    } catch (error) {
      router.push("/error");
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-20 mb-20">
        <div>
          <h2 className="font-bold text-2xl mb-8 text-center">Sign Up!!</h2>
          <div className="flex justify-around mb-8">
            <button
              className="focus:outline-none"
              onClick={createAccountWithGoogle}
            >
              <img
                src="google-icon.svg"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
            <button
              className="focus:outline-none"
              onClick={createAccountWithTwitter}
            >
              <img
                src="twitter.svg"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
            <button
              className="focus:outline-none"
              onClick={createAccountWithGithub}
            >
              <img
                src="github-icon.svg"
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-300"
              />
            </button>
          </div>
          <form
            className="flex flex-col  w-80"
            onSubmit={handleSubmit(createAccountWithEmail)}
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
            <button
              className="text-white bg-purple-500 rounded px-8 py-2 mb-6 focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
            <Link href="/signin">
              <a className="text-center text-sm hover:opacity-50 transition duration-300">
                Sign inに戻る
              </a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

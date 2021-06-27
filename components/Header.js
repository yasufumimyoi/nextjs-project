import {
  UserIcon,
  LoginIcon,
  FilmIcon,
  BookmarkIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { useSelector, useDispatch } from "react-redux";
import { removeLogin, removeUid, removeProfile } from "../redux/user";
import { resetList } from "../redux/movie";
import { useRouter } from "next/router";
import { firebase } from "../firebase/config";

const Header = () => {
  const { isLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const dispath = useDispatch();

  const handleLogout = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました");
          router.push("/");
          dispath(removeUid());
          dispath(removeLogin());
          dispath(removeProfile());
          dispath(resetList());
          sessionStorage.clear();
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className="mb-5 mt-5 flex justify-between items-center">
      <Link href="/">
        <a className="flex items-center">
          <FilmIcon className="h-8 mr-2 text-purple-500 " />
          <div className="text-lg sm:text-2xl font-bold  hover:opacity-50 transition duration-300 cursor-pointer">
            Anime Tracker
          </div>
        </a>
      </Link>

      <nav className="flex items-center">
        <div className="mr-4 hidden md:block">
          <SearchForm />
        </div>
        <ul className="flex">
          <Link href="/list">
            <a className="mr-5">
              <HeaderItem Icon={BookmarkIcon} title="LIST" />
            </a>
          </Link>
          <Link href="/profile">
            <a className="mr-5">
              <HeaderItem Icon={UserIcon} title="PROFILE" />
            </a>
          </Link>
          {isLogin ? (
            <button className="focus:outline-none" onClick={handleLogout}>
              <HeaderItem Icon={LogoutIcon} title="LOGOUT" />
            </button>
          ) : (
            <Link href="/signin">
              <a>
                <HeaderItem Icon={LoginIcon} title="LOGIN" />
              </a>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

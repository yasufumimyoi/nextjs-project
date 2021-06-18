import {
  UserIcon,
  LogoutIcon,
  FilmIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import Link from "next/link";
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <header className="mb-5 mt-5 flex justify-between items-center">
      <Link href="/">
        <a className="flex items-center">
          <FilmIcon className="h-8 mr-2 text-purple-500 " />
          <div className="text-2xl font-bold  hover:opacity-50 transition duration-300 cursor-pointer">
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
              <HeaderItem Icon={BookmarkIcon} />
            </a>
          </Link>
          <Link href="/profile">
            <a className="mr-5">
              <HeaderItem Icon={UserIcon} />
            </a>
          </Link>
          <Link href="/login">
            <a>
              <HeaderItem Icon={LogoutIcon} />
            </a>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

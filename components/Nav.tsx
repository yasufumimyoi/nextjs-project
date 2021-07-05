import Link from "next/link";

const Nav = () => {
  return (
    <ul className="flex justify-around mb-6 sm:justify-start">
      <li className="font-semibold text-sm mr-3 ">
        <Link as="/trending/2021" href="/trending/[year]">
          <div className="hover:opacity-50 transition duration-300 cursor-pointer">
            <a className="sm:hidden">2021年</a>
            <a className="hidden sm:block">2021年の人気アニメ |</a>
          </div>
        </Link>
      </li>
      <li className="font-semibold text-sm mr-3 ">
        <Link as="/trending/2020" href="/trending/[year]">
          <div className="hover:opacity-50 transition duration-300 cursor-pointer">
            <a className="sm:hidden">2020年</a>
            <a className="hidden sm:block">2020年の人気アニメ |</a>
          </div>
        </Link>
      </li>
      <li className="font-semibold text-sm">
        <Link as="/trending/2019" href="/trending/[year]">
          <div className="hover:opacity-50 transition duration-300 cursor-pointer">
            <a className="sm:hidden">2019年</a>
            <a className="hidden sm:block">2019年の人気アニメ |</a>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Nav;

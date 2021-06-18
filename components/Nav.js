import Link from "next/link";

const Nav = () => {
  return (
    <ul className="flex  mb-6">
      <li className="font-semibold text-sm mr-3 hover:opacity-50 transition duration-300">
        <Link as="/trending/2021" href="/trending/[year]">
          <a>2021年の人気アニメ |</a>
        </Link>
      </li>
      <li className="font-semibold text-sm mr-3 hover:opacity-50 transition duration-300">
        <Link as="/trending/2020" href="/trending/[year]">
          <a>2020年の人気アニメ |</a>
        </Link>
      </li>
      <li className="font-semibold text-sm hover:opacity-50 transition duration-300">
        <Link as="/trending/2019" href="/trending/[year]">
          <a>2019年の人気アニメ</a>
        </Link>
      </li>
    </ul>
  );
};

export default Nav;

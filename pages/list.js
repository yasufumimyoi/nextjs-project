import Link from "next/link";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const List = () => {
  const { movieList } = useSelector((state) => state.movie);

  return (
    <div>
      <h2 className="font-bold text-lg mb-5">お気に入りリスト</h2>
      <div className="sm:grid sm:gap-10 md:grid-cols-2 xl:grid-cols-4 xl:max-w-7xl xl:mx-auto">
        {movieList.length > 0 ? (
          movieList.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <div>
            <h2 className="font-semibold text-md mb-5">
              リストに登録されていません。
            </h2>
            <Link href="/">
              <a className="mb-5">TOPに戻る</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;

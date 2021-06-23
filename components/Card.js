import Link from "next/link";
import Image from "next/image";
import { ThumbUpIcon, BookmarkIcon, TrashIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookdedIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { addList, removeList } from "../redux/movie";
import { writeFirestore, removeFirestore } from "../firebase/function";

const CardTest = ({ movie }) => {
  const { movieList } = useSelector((state) => state.movie);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let storeMovie = movieList.find((o) => o.id === movie.id);
  let watchList = storeMovie ? true : false;
  const style = storeMovie
    ? "h-5  text-purple-500 mr-2 cursor-pointer hover:opacity-50 transition duration-300"
    : "h-5  text-purple-500 mr-2 cursor-auto";

  const writeData = (movie, users) => {
    writeFirestore(movie, users);
    dispatch(addList(movie));
  };

  const removeData = (id, users) => {
    removeFirestore(id, users);
    dispatch(removeList(id));
  };

  return (
    <div className="mb-5 shadow-2xl sm:mb-0">
      <Link as={`/result/${movie.id}`} href="/result/[id]">
        <a>
          <Image
            src={movie.attributes.posterImage.original}
            width={550}
            height={780}
            alt={movie.attributes.titles.ja_jp}
            layout="responsive"
            className="rounded-t-lg hover:opacity-80 transition duration-300"
          />
        </a>
      </Link>
      <div className="p-5">
        <h2 className="truncate mb-2">{movie.attributes.titles.ja_jp}</h2>
        <div className="flex justify-between">
          <div className="flex">
            <ThumbUpIcon className="h-5 text-purple-500 mr-2" />
            <p className="text-sm">
              {movie.attributes.averageRating != null
                ? movie.attributes.averageRating + "%"
                : "データがありません"}
            </p>
          </div>
          <div className="flex">
            <button
              onClick={() => writeData(movie, users)}
              disabled={watchList}
              className="focus:outline-none"
            >
              {watchList ? (
                <BookdedIcon className="h-5 text-purple-500 mr-2  cursor-auto" />
              ) : (
                <BookmarkIcon className="h-5 text-purple-500 mr-2 cursor-pointer hover:opacity-50 transition duration-300" />
              )}
            </button>
            <TrashIcon
              onClick={() => removeData(movie.id, users)}
              className={style}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTest;

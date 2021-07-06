import Link from "next/link";
import Image from "next/image";
import { ThumbUpIcon, BookmarkIcon, TrashIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookdedIcon } from "@heroicons/react/solid";
import { addList, removeList } from "../redux/movie";
import { writeFirestore, removeFirestore } from "../firebase/function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Status } from "../types/index";

export type MovieData = {
  id: string;
  title: string;
  image: string;
  averageRating: string;
  episodeLength: number;
  status: Status;
  createdAt: string;
};

const Card = (movie: MovieData) => {
  const { movieList } = useSelector((state: RootState) => state.movie);
  const { uid } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const storeMovie = movieList.find((o) => o?.id === movie.id);
  const watchList = !!storeMovie;
  const style = storeMovie
    ? "h-5  text-purple-500 mr-2 cursor-pointer hover:opacity-50 transition duration-300"
    : "h-5  text-purple-500 mr-2 cursor-auto";

  const writeData = (movie: MovieData, uid: string) => {
    writeFirestore(movie, uid);
    dispatch(addList(movie));
  };

  const removeData = (id: string, uid: string) => {
    removeFirestore(id, uid);
    dispatch(removeList(id));
  };

  return (
    <div className="mb-5 shadow-2xl sm:mb-0">
      <Link as={`/result/${movie.id}`} href="/result/[id]">
        <a>
          <Image
            src={movie.image}
            width={550}
            height={780}
            alt={movie.title}
            layout="responsive"
            className="rounded-t-lg hover:opacity-80 transition duration-300"
          />
        </a>
      </Link>
      <div className="p-5">
        <h2 className="truncate mb-2">{movie.title}</h2>
        <div className="flex justify-between">
          <div className="flex">
            <ThumbUpIcon className="h-5 text-purple-500 mr-2" />
            <p className="text-sm">
              {movie.averageRating
                ? `${movie.averageRating}%`
                : "データがありません"}
            </p>
          </div>
          <div className="flex">
            <button
              onClick={() => writeData(movie, uid)}
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
              onClick={() => removeData(movie.id, uid)}
              className={style}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

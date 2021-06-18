import Link from "next/link";
import Image from "next/image";
import { ThumbUpIcon, BookmarkIcon, TrashIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookdedIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
const CardTest = ({ movie }) => {
  const { movieList, addList, removeItem } = useContext(GlobalContext);

  let storeMovie = movieList.find((o) => o.id === movie.id);
  // let storeMovie = movieList.find((o) => o.movie?.id === movie.id);
  let watchList = storeMovie ? true : false;
  const style = storeMovie
    ? "h-5  text-purple-500 mr-2 cursor-pointer hover:opacity-50 transition duration-300"
    : "h-5  text-purple-500 mr-2 cursor-auto";

  return (
    <div className="mb-5 shadow-2xl sm:mb-0">
      <Link as={`/result/${movie.id}`} href="/result/[id]" key={movie.id}>
        <a>
          <Image
            src={movie.attributes.posterImage.original}
            width={
              movie.attributes.posterImage.meta.dimensions.large.width
                ? movie.attributes.posterImage.meta.dimensions.large.width
                : 550
            }
            height={
              movie.attributes.posterImage.meta.dimensions.large.height
                ? movie.attributes.posterImage.meta.dimensions.large.height
                : 780
            }
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
              onClick={() => addList(movie)}
              disabled={watchList}
              className="focus:outline-none"
            >
              {watchList ? (
                <BookdedIcon className="h-5 text-purple-500 mr-2  cursor-auto" />
              ) : (
                <BookmarkIcon className="h-5 text-purple-500 mr-2 cursor-pointer hover:opacity-50 transition duration-300" />
              )}
            </button>
            <TrashIcon onClick={() => removeItem(movie.id)} className={style} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTest;

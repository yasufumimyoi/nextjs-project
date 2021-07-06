import Image from "next/image";
import {
  ThumbUpIcon,
  BookmarkIcon,
  TrashIcon,
  ClockIcon,
  ChatAltIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon as BookdedIcon } from "@heroicons/react/solid";
import { addList, removeList } from "../redux/movie";
import { writeFirestore, removeFirestore } from "../firebase/function";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../types/index";
import { MovieData } from "../components/Card";

type DetailData = {
  startDate: string;
  youtubeVideoId: string;
};

type ResultProps = MovieData & DetailData;

const Detail = (result: ResultProps) => {
  const { movieList } = useSelector((state: RootState) => state.movie);
  const { uid } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const storeMovie = movieList.find((o) => o.id === result.id);
  const watchList = storeMovie ? true : false;
  const style = storeMovie
    ? "flex h-5 mr-2 cursor-pointer hover:opacity-50 transition duration-300"
    : "flex h-5 mr-2 cursor-auto　focus:outline-none";

  const writeData = (movie: MovieData, uid: string) => {
    writeFirestore(movie, uid);
    dispatch(addList(movie));
  };

  const removeData = (id: string, uid: string) => {
    removeFirestore(id, uid);
    dispatch(removeList(id));
  };

  const status = (type: string) => {
    switch (type) {
      case Status.finished:
        return "ステータス : 放送終了";
      case Status.current:
        return "ステータス : 現在放送中";
      case Status.unreleased:
        return "ステータス : 放送予定";
    }
  };

  return (
    <div>
      <div key={result.id}>
        <div className="flex flex-col sm:flex-row mb-10">
          <div className="mb-5 sm:w-2/4 sm:max-w-sm sm:mr-5 md:mr-16">
            <Image
              src={result.image}
              width={550}
              height={780}
              alt={result.title}
            />
          </div>

          <div className="sm:w-2/4">
            <h3 className="text-lg text-center font-extrabold mb-5 sm:text-left md:mb-10">{`${
              result.title
            } (${result.startDate.slice(0, 4)})`}</h3>
            <div className="flex justify-around sm:justify-between">
              <div>
                <div className="flex">
                  <ThumbUpIcon className="h-5 text-purple-500 mr-1" />
                  <p className="text-sm mb-3 sm:text-base">
                    ユーザースコア :{" "}
                    {result.averageRating
                      ? result.averageRating + "%"
                      : "データがありません"}
                  </p>
                </div>
                <div className="flex">
                  <ChatAltIcon className="h-5 text-purple-500 mr-1" />
                  <p className="text-sm mb-3 sm:text-base">
                    エピソード数：{result.episodeLength}話
                  </p>
                </div>
                <div className="flex">
                  <ClockIcon className="h-5 text-purple-500 mr-1" />
                  <p>{status(result.status)}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => writeData(result, uid)}
                  disabled={watchList}
                  className="focus:outline-none block"
                >
                  {watchList ? (
                    <div className="flex group">
                      <BookdedIcon className="h-5 text-purple-500 mb-5 group-hover:cursor-auto mr-1" />
                      <p className="text-sm sm:text-base  group-hover:cursor-auto">
                        追加済み
                      </p>
                    </div>
                  ) : (
                    <div className="flex group">
                      <BookmarkIcon className="h-5 text-purple-500 mb-5 group-hover:opacity-50 duration-300 group-hover:cursor-pointer mr-1" />
                      <p className="text-sm sm:text-base cursor-pointer">
                        お気に入りに追加
                      </p>
                    </div>
                  )}
                </button>
                <div
                  className={style}
                  onClick={() => removeData(result.id, uid)}
                >
                  <TrashIcon className="h-5 text-purple-500  mr-1" />
                  <p className="text-sm sm:text-base">お気に入りから削除</p>
                </div>
              </div>
            </div>
            {result.youtubeVideoId && (
              <div className="aspect-w-16 aspect-h-9 mt-5 md:mt-14">
                <iframe
                  src={`https://www.youtube.com/embed/${result.youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

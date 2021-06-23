import Image from "next/image";
import {
  ThumbUpIcon,
  BookmarkIcon,
  TrashIcon,
  ClockIcon,
  ChatAltIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon as BookdedIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { addList, removeList } from "../redux/movie";
import { writeFirestore, removeFirestore } from "../firebase/function";

const Detail = ({ result }) => {
  const { movieList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  let storeMovie = movieList.find((o) => o.id === result.data[0].id);
  const watchList = storeMovie ? true : false;
  const style = storeMovie
    ? "flex h-5 mr-2 cursor-pointer hover:opacity-50 transition duration-300"
    : "flex h-5 mr-2 cursor-auto　focus:outline-none";

  const writeData = (movie) => {
    writeFirestore(movie);
    dispatch(addList(movie));
  };

  const removeData = (id) => {
    removeFirestore(id);
    dispatch(removeList(id));
  };

  return (
    <div>
      {result.data.map((detail) => (
        <div key={detail.id}>
          <div className="flex flex-col sm:flex-row mb-10">
            <div className="mb-5 sm:w-2/4 sm:max-w-sm sm:mr-5 md:mr-16">
              <Image
                src={detail.attributes.posterImage.original}
                width={1080}
                height={1920}
                alt={detail.attributes.titles.ja_jp}
              />
            </div>

            <div className="sm:w-2/4">
              <h3 className="text-lg text-center font-extrabold mb-5 sm:text-left md:mb-10">{`${
                detail.attributes.titles.ja_jp
              } (${detail.attributes.startDate.slice(0, 4)})`}</h3>
              <div className="flex justify-around sm:justify-between">
                <div>
                  <div className="flex">
                    <ThumbUpIcon className="h-5 text-purple-500 mr-1" />
                    <p className="text-sm mb-3 sm:text-base">
                      ユーザースコア : {detail.attributes.averageRating}%
                    </p>
                  </div>
                  <div className="flex">
                    <ChatAltIcon className="h-5 text-purple-500 mr-1" />
                    <p className="text-sm mb-3 sm:text-base">
                      エピソード数：{detail.attributes.episodeLength}話
                    </p>
                  </div>

                  {detail.attributes.status === "finished" && (
                    <div className="flex">
                      <ClockIcon className="h-5 text-purple-500 mr-1" />
                      <p className="text-sm mb-3 sm:text-base">
                        ステータス : 放送終了
                      </p>
                    </div>
                  )}
                  {detail.attributes.status === "current" && (
                    <div className="flex">
                      <ClockIcon className="h-5 text-purple-500 mr-1" />
                      <p className="text-sm mb-5 sm:text-base">
                        ステータス : 現在放送中
                      </p>
                    </div>
                  )}
                  {detail.attributes.status === "unreleased" && (
                    <div className="flex">
                      <ClockIcon className="h-5 text-purple-500 mr-1" />
                      <p className="mb-5 sm:text-base">ステータス : 放送予定</p>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => writeData(result.data[0])}
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
                    onClick={() => removeData(result.data[0].id)}
                  >
                    <TrashIcon className="h-5 text-purple-500  mr-1" />
                    <p className="text-sm sm:text-base">お気に入りから削除</p>
                  </div>
                </div>
              </div>
              {detail.attributes.youtubeVideoId != null && (
                <div className="aspect-w-16 aspect-h-9 mt-5 md:mt-14">
                  <iframe
                    src={`https://www.youtube.com/embed/${detail.attributes.youtubeVideoId}`}
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
      ))}
    </div>
  );
};

export default Detail;

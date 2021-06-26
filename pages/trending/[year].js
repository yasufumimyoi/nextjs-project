import { useState } from "react";
import { useRouter } from "next/router";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/Card";

const Trending = ({ results }) => {
  const router = useRouter();
  const year = router.query.year;
  const [movies, setMovies] = useState(results);
  const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&sort=-averageRating&page[limit]=20&page[offset]=${movies.length}`;

  if (movies[0].id != results[0].id) {
    setMovies(results);
  }

  const getMoreMovies = async () => {
    const request = await fetch(ANIME_API);
    const newMovies = await request.json();

    console.log(newMovies.data);

    const selectedData = newMovies.data.map((movie) => {
      const item = {};
      item["id"] = movie.id;
      item["title"] = movie.attributes.titles.ja_jp;
      item["image"] = movie.attributes.posterImage.original;
      item["rating"] = movie.attributes.averageRating;
      item["episode"] = movie.attributes.episodeLength;
      item["status"] = movie.attributes.status;
      return item;
    });

    setMovies((movies) => [...movies, ...selectedData]);
  };

  return (
    <div>
      <div className="flex items-center mb-5">
        <VideoCameraIcon className="h-5 text-purple-500 mr-2" />
        <h2 className="font-bold text-lg">{`${year}年の人気アニメ`}</h2>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMoreMovies}
        hasMore={true}
      >
        <div className="sm:grid sm:gap-10 md:grid-cols-3 xl:grid-cols-4 xl:max-w-7xl xl:mx-auto">
          {movies.map((movie, index) => (
            <Card movie={movie} key={movie.title + index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Trending.getInitialProps = async (ctx) => {
  const year = ctx.query.year;
  const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&sort=-averageRating&page[limit]=20&page[offset]=0`;
  const res = await fetch(ANIME_API);
  const data = await res.json();

  const validTitle = data.data.filter(
    (movie) =>
      movie.attributes.titles.ja_jp !== undefined &&
      movie.attributes.averageRating !== null
  );

  const selectedData = validTitle.map((movie) => {
    const item = {};
    item["id"] = movie.id;
    item["title"] = movie.attributes.titles.ja_jp;
    item["image"] = movie.attributes.posterImage.original;
    item["rating"] = movie.attributes.averageRating;
    item["episode"] = movie.attributes.episodeLength;
    item["status"] = movie.attributes.status;
    return item;
  });

  return { results: selectedData };
};

export default Trending;

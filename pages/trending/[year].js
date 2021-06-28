import { useState } from "react";
import { useRouter } from "next/router";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/Card";
import { useDispatch } from "react-redux";
import { fetchMoreMovieData } from "../../redux/movie";

const Trending = ({ results }) => {
  const router = useRouter();
  const year = router.query.year;
  const dispatch = useDispatch();
  const [movies, setMovies] = useState(results);

  if (movies[0].id != results[0].id) {
    setMovies(results);
  }

  const getMoreMovies = async () => {
    const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&sort=-averageRating&page[limit]=20&page[offset]=${movies.length}`;
    dispatch(fetchMoreMovieData(ANIME_API)).then(({ payload }) => {
      setMovies((movies) => [...movies, ...payload]);
    });
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
  const { data } = await res.json();

  const validTitles = data.filter(
    (movie) => movie.attributes.titles.ja_jp && movie.attributes.averageRating
  );

  const selectedData = validTitles.map(({ id, attributes }) => {
    const { titles, posterImage, averageRating, episodeLength, status } =
      attributes;

    return {
      id,
      title: titles.ja_jp,
      image: posterImage.original,
      averageRating,
      episodeLength,
      status,
    };
  });

  return { results: selectedData };
};

export default Trending;

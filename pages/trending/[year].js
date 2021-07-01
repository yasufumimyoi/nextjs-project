import { useEffect } from "react";
import { useRouter } from "next/router";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreMovieData, addMovies } from "../../redux/movie";

const Trending = ({ results }) => {
  const router = useRouter();
  const year = router.query.year;
  const { movies } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addMovies(results));
  }, [year]);

  const getMoreMovies = async () => {
    const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&sort=-averageRating&page[limit]=20&page[offset]=${movies.length}`;
    dispatch(fetchMoreMovieData(ANIME_API));
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

  const selectedData = validTitles.map(({ id, attributes }) => ({
    id,
    ...attributes,
    title: attributes.titles.ja_jp,
    image: attributes.posterImage.original,
  }));

  return { results: selectedData };
};

export default Trending;

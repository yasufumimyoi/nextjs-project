import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { VideoCameraIcon } from "@heroicons/react/outline";
import Card from "../components/Card";
import { fetchMoreMovieData, addMovies } from "../redux/movie";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ results }) {
  const { movies } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addMovies(results));
  }, []);

  const getMoreMovies = async () => {
    const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=2021&filter[status]=current&sort=-averageRating&page[limit]=20&page[offset]=${movies.length}`;
    dispatch(fetchMoreMovieData(ANIME_API));
  };

  return (
    <div>
      <Head>
        <title>Anime Tracker</title>
        <meta name="description" content="List your favorite anime" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center mb-5">
        <VideoCameraIcon className="h-5 text-purple-500 mr-2" />
        <h2 className="font-bold text-lg ">現在放送中のアニメ</h2>
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
}

export async function getServerSideProps() {
  const ANIME_API =
    "https://kitsu.io/api/edge/anime?filter[seasonYear]=2021&filter[status]=current&sort=-averageRating&page[limit]=20&page[offset]=0";

  const request = await fetch(ANIME_API);
  const { data } = await request.json();

  const validTitles = data.filter(
    (movie) => movie.attributes.titles.ja_jp && movie.attributes.averageRating
  );

  const selectedData = validTitles.map(({ id, attributes }) => ({
    id,
    ...attributes,
    title: attributes.titles.ja_jp,
    image: attributes.posterImage.original,
  }));

  return {
    props: {
      results: selectedData,
    },
  };
}

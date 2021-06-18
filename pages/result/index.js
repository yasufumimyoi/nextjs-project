import Card from "../../components/Card";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useRouter } from "next/router";

const Details = ({ results }) => {
  const router = useRouter();
  const keyword = router.query.keyword;

  const validData = [];

  if (results.meta.count > 0) {
    const validTitle = results.data.filter(
      (movie) =>
        movie.attributes.titles.ja_jp && movie.attributes.ratingRank !== null
    );

    validTitle.map((movie) => {
      if (movie.attributes.titles.ja_jp.indexOf(keyword)) {
        validData.push(movie);
      }
    });
  }

  const [movies, setMovies] = useState(validData);

  if (results.meta.count > 0) {
    if (movies.length === 0 || movies[0].id != results.data[0].id) {
      setMovies(results.data);
    }
  }

  const getMoreMovies = async () => {
    const ANIME_API = `https://kitsu.io/api/edge/anime?filter[text]=${keyword}&page[offset]=${movies.length}`;
    const request = await fetch(ANIME_API);
    const newMovies = await request.json();

    const validTitles = newMovies.data.filter(
      (movie) =>
        movie.attributes.titles.ja_jp !== null &&
        movie.attributes.ratingRank !== null
    );

    let filteredData = [];
    validTitles.map((movie) => {
      let title = movie.attributes.titles.ja_jp;
      if (title.indexOf(keyword) > 0) {
        filteredData.push(movie);
      }
    });

    setMovies((movies) => [...movies, ...filteredData]);
  };

  return (
    <div>
      <div className="flex items-center mb-5">
        <VideoCameraIcon className="h-5 text-purple-500 mr-2" />
        <h2 className="font-bold text-lg">{`検索ワード：${keyword}`}</h2>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getMoreMovies}
        hasMore={true}
      >
        <div className="sm:grid sm:gap-10 md:grid-cols-3 xl:grid-cols-4 xl:max-w-7xl xl:mx-auto">
          {results.meta.count > 0 ? (
            movies.map((movie, index) => (
              <Card movie={movie} key={movie.type + index} />
            ))
          ) : (
            <h2>No data</h2>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Details.getInitialProps = async (ctx) => {
  const keyword = ctx.query.keyword;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[text]=${keyword}`;
  const encode = encodeURI(SEARCH_API);
  const res = await fetch(encode);
  const data = await res.json();

  return { results: data };
};

export default Details;

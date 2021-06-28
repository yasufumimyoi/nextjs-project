import Card from "../../components/Card";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchMoreMovieData } from "../../redux/movie";

const Details = ({ results }) => {
  const router = useRouter();
  const keyword = router.query.keyword;
  const dispatch = useDispatch();
  const [movies, setMovies] = useState(results);
  const ANIME_API = `https://kitsu.io/api/edge/anime?filter[text]=${keyword}&page[offset]=${movies.length}`;

  if (movies.length === 0) {
    setMovies([{ id: "No Data" }]);
  } else if (results.length > 0 && movies[0].id != results[0].id) {
    setMovies(results);
  }

  const getMoreMovies = async () => {
    dispatch(fetchMoreMovieData(ANIME_API)).then(({ payload }) => {
      let filteredData = [];
      payload.forEach(
        ({ id, title, image, averageRating, episodeLength, status }) => {
          if (title.indexOf(keyword) > 0) {
            const item = {
              id,
              title,
              image,
              averageRating,
              episodeLength,
              status,
            };
            filteredData.push(item);
          }
        }
      );
      setMovies((movies) => [...movies, ...filteredData]);
    });
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
          {results.length > 0 ? (
            movies.map((movie, index) => (
              <Card movie={movie} key={movie.title + index} />
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
  const { data } = await res.json();

  const validTitle = data.filter(
    (movie) => movie.attributes.titles.ja_jp && movie.attributes.averageRating
  );

  let selectedData = [];

  if (validTitle.length > 0) {
    selectedData = validTitle.map(({ id, attributes }) => {
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
  }

  return { results: selectedData };
};

export default Details;

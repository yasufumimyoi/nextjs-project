import Card from "../../components/Card";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreMovieData, addMovies, setKeyword } from "../../redux/movie";

const Details = ({ results }) => {
  const router = useRouter();
  const keyword = router.query.keyword;
  const { movies } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const ANIME_API = `https://kitsu.io/api/edge/anime?filter[text]=${keyword}&page[offset]=${movies.length}`;

  useEffect(() => {
    if (movies.length) {
      dispatch(addMovies(results));
      dispatch(setKeyword(keyword));
    }
  }, [keyword]);

  const getMoreMovies = async () => {
    dispatch(fetchMoreMovieData(ANIME_API));
  };

  const MemorizedCard = useMemo(() => {
    movies.map((video) => <Card movie={video} key={movie.title + index} />);
  }, [results.length]);

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
          {results.length ? <MemorizedCard /> : <h2>No data</h2>}
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
    selectedData = validTitle.map(({ id, attributes }) => ({
      id,
      ...attributes,
      title: attributes.titles.ja_jp,
      image: attributes.posterImage.original,
    }));
  }

  return { results: selectedData };
};

export default Details;

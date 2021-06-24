import Card from "../../components/Card";
import { VideoCameraIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useRouter } from "next/router";

const Details = ({ results }) => {
  const router = useRouter();
  const keyword = router.query.keyword;

  const validTitle = results.filter(
    (movie) => movie.title && movie.rating !== null
  );

  const [movies, setMovies] = useState(validTitle);

  if (movies.length === 0) {
    setMovies([{ id: "No Data" }]);
  } else if (results.length > 0 && movies[0].id != results[0].id) {
    setMovies(results);
  }

  const getMoreMovies = async () => {
    const ANIME_API = `https://kitsu.io/api/edge/anime?filter[text]=${keyword}&page[offset]=${movies.length}`;
    const request = await fetch(ANIME_API);
    const newMovies = await request.json();

    const validTitles = newMovies.data.filter(
      (movie) =>
        movie.attributes.titles.ja_jp !== undefined &&
        movie.attributes.ratingRank !== null
    );

    let filteredData = [];

    validTitles.map((movie) => {
      let title = movie.attributes.titles.ja_jp;
      if (title.indexOf(keyword) > 0) {
        let temp = {};
        let id = movie.id;
        let title = movie.attributes.titles.ja_jp;
        let image = movie.attributes.posterImage.original;
        let rating = movie.attributes.averageRating;
        let episode = movie.attributes.episodeLength;
        let status = movie.attributes.status;
        temp["id"] = id;
        temp["title"] = title;
        temp["image"] = image;
        temp["rating"] = rating;
        temp["episode"] = episode;
        temp["status"] = status;
        filteredData.push(temp);
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
  const data = await res.json();

  const validTitle = data.data.filter(
    (movie) =>
      movie.attributes.titles.ja_jp !== undefined &&
      movie.attributes.ratingRank !== null
  );

  let selectedData = [];

  if (validTitle.length > 0) {
    for (let i = 0; i < data.data.length; i++) {
      let temp = {};
      let id = data.data[i].id;
      let title = data.data[i].attributes.titles.ja_jp;
      let image = data.data[i].attributes.posterImage.original;
      let rating = data.data[i].attributes.averageRating;
      let episode = data.data[i].attributes.episodeLength;
      let status = data.data[i].attributes.status;
      temp["id"] = id;
      temp["title"] = title;
      temp["image"] = image;
      temp["rating"] = rating;
      temp["episode"] = episode;
      temp["status"] = status;
      selectedData.push(temp);
    }
  }

  return { results: selectedData };
};

export default Details;

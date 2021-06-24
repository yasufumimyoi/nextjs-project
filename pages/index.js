import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/outline";
import Card from "../components/Card";

export default function Home({ results }) {
  const [movies, setMovies] = useState(results);

  const getMoreMovies = async () => {
    const request = await fetch(ANIME_API);
    const newMovies = await request.json();

    const validTitles = newMovies.data.filter(
      (movie) =>
        movie.attributes.titles.ja_jp != undefined &&
        movie.attributes.ratingRank != null
    );

    let selectedData = [];

    for (let i = 0; i < validTitles.length; i++) {
      let temp = {};
      let id = validTitles[i].id;
      let title = validTitles[i].attributes.titles.ja_jp;
      let image = validTitles[i].attributes.posterImage.original;
      let rating = validTitles[i].attributes.averageRating;
      let episode = validTitles[i].attributes.episodeLength;
      let status = validTitles[i].attributes.status;
      temp["id"] = id;
      temp["title"] = title;
      temp["image"] = image;
      temp["rating"] = rating;
      temp["episode"] = episode;
      temp["status"] = status;
      selectedData.push(temp);
    }

    setMovies((movies) => [...movies, ...selectedData]);
  };

  const ANIME_API = `https://kitsu.io/api/edge/anime?filter[seasonYear]=2021&filter[status]=current&sort=-averageRating&page[limit]=20&page[offset]=${movies.length}`;

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
  const data = await request.json();

  let selectedData = [];

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

  return {
    props: {
      results: selectedData,
    },
  };
}

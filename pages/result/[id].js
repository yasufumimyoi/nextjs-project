import Detail from "../../components/Detail";

const Result = ({ result }) => {
  return <Detail result={result} />;
};

Result.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[id]]=${id}`;
  const res = await fetch(SEARCH_API);
  const data = await res.json();

  const selectedData = data.data.map((movie) => {
    const item = {};
    item["id"] = movie.id;
    item["title"] = movie.attributes.titles.ja_jp;
    item["image"] = movie.attributes.posterImage.original;
    item["rating"] = movie.attributes.averageRating;
    item["episode"] = movie.attributes.episodeLength;
    item["status"] = movie.attributes.status;
    item["startDate"] = movie.attributes.startDate;
    item["youtubeId"] = movie.attributes.youtubeVideoId;
    return item;
  });

  return { result: selectedData };
};

export default Result;

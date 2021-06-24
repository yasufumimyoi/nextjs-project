import Detail from "../../components/Detail";

const Result = ({ result }) => {
  return <Detail result={result} />;
};

Result.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[id]]=${id}`;
  const res = await fetch(SEARCH_API);
  const data = await res.json();

  let selectedData = [];

  for (let i = 0; i < data.data.length; i++) {
    let temp = {};
    let id = data.data[i].id;
    let title = data.data[i].attributes.titles.ja_jp;
    let image = data.data[i].attributes.posterImage.original;
    let rating = data.data[i].attributes.averageRating;
    let episode = data.data[i].attributes.episodeLength;
    let status = data.data[i].attributes.status;
    let startDate = data.data[i].attributes.startDate;
    let youtubeId = data.data[i].attributes.youtubeVideoId;
    temp["id"] = id;
    temp["title"] = title;
    temp["image"] = image;
    temp["rating"] = rating;
    temp["episode"] = episode;
    temp["status"] = status;
    temp["startDate"] = startDate;
    temp["youtubeId"] = youtubeId;
    selectedData.push(temp);
  }

  return { result: selectedData };
};

export default Result;

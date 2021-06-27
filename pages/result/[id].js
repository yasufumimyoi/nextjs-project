import Detail from "../../components/Detail";

const Result = ({ result }) => {
  return <Detail result={result} />;
};

Result.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[id]]=${id}`;
  const res = await fetch(SEARCH_API);
  const { data } = await res.json();

  const validTitles = data.filter(
    (movie) =>
      movie.attributes.titles.ja_jp !== undefined &&
      movie.attributes.averageRating !== null
  );

  const selectedData = validTitles.map((movie) => {
    const { id } = movie;
    const {
      titles,
      posterImage,
      averageRating,
      episodeLength,
      status,
      startDate,
      youtubeVideoId,
    } = movie.attributes;

    return {
      id,
      title: titles.ja_jp,
      image: posterImage.original,
      averageRating,
      episodeLength,
      status,
      startDate,
      youtubeVideoId,
    };
  });

  return { result: selectedData };
};

export default Result;

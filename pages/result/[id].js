import Detail from "../../components/Detail";
import React from "react";

const Result = React.memo(
  ({ result }) => {
    return <Detail result={result} />;
  },
  (prevProps, nextProps) => {
    const prevId = prevProps.result.id;
    const nextId = nextProps.result.id;
    return prevId === nextId;
  }
);

Result.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[id]]=${id}`;
  const res = await fetch(SEARCH_API);
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

  return { result: selectedData };
};

export default Result;

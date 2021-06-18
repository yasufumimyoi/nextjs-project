import Detail from "../../components/Detail";

const Result = ({ result }) => {
  return <Detail result={result} />;
};

Result.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  const SEARCH_API = `https://kitsu.io/api/edge/anime?filter[id]]=${id}`;
  const res = await fetch(SEARCH_API);
  const data = await res.json();

  return { result: data };
};

export default Result;

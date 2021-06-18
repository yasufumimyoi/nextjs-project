import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2>大変申し訳ございません</h2>
      <p>お探しのページは存在しないか、削除された可能性がございます。</p>
      <Link href="/">
        <a>Topへ戻る</a>
      </Link>
    </div>
  );
};

export default NotFound;

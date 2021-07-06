import Link from "next/link";
import { ExclamationIcon } from "@heroicons/react/outline";

const Error = () => (
  <div className="mt-10">
    <div className="flex items-center mb-5">
      <ExclamationIcon className="h-12 text-yellow-300 mr-2" />
      <h3>Eメールアドレスは既に使用されています。</h3>
    </div>
    <p className="mb-5">
      「初めての方はこちらへ」を選択されましたが、お申し込みのEメールアドレスを使用するアカウントは既に登録されています。
    </p>
    <Link href="/signin">
      <a className="text-sm mb-10 cursor-pointer hover:opacity-50 transition duration-300">
        Sing inはこちら
      </a>
    </Link>
  </div>
);

export default Error;

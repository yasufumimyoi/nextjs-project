import { useRouter } from "next/router";
import { firebase } from "../firebase/config";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/schemas";

const Reset = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleReset = (email: string) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたアドレスにパスワードリセット用のメールをお送りしました"
        );
        router.push("/signin");
      })
      .catch(() => {
        alert("パスワードリセットに失敗しました");
      });
  };

  return (
    <div>
      <div className="flex justify-center mt-20 mb-20">
        <div>
          <h2 className="font-bold text-2xl mb-8 text-center">
            Password Reset!!
          </h2>
          <form
            className="flex flex-col w-80"
            onSubmit={handleSubmit((data) => handleReset(data.email))}
          >
            {errors.email && (
              <p className="text-red-500 text-sm text-center">
                {errors.email.message}
              </p>
            )}
            <input
              className={`border rounded mb-6 px-8 py-2 outline-none ${
                errors.email ? "border-red-400" : "text-base"
              }`}
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <button className="text-white bg-purple-500 rounded px-8 py-2 mb-5 focus:outline-none">
              Reset
            </button>
            <Link href="/signin">
              <a className="text-center text-sm hover:opacity-50 transition duration-300">
                Sign inに戻る
              </a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeUid, Logout, removeProfile } from "../../redux/user";
import { resetList } from "../../redux/movie";
import { useRouter } from "next/router";
import { firebase } from "../../firebase/config";
import {
  BookOpenIcon,
  CalendarIcon,
  LocationMarkerIcon,
  HeartIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";

const Profile = () => {
  const { profile, isLogin } = useSelector((state) => state.user);
  const { movieList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const router = useRouter();

  const handelDelete = () => {
    if (window.confirm("アカウントを削除しますか？")) {
      const user = firebase.auth().currentUser;
      if (user) {
        user
          .delete()
          .then(() => {
            router.push("/");
            dispatch(removeUid());
            dispatch(Logout());
            dispatch(removeProfile());
            dispatch(resetList());
          })
          .catch((eroor) => {
            console.log(eroor);
          });
      }
    }
  };

  return (
    <div className="mt-10 mb-10">
      <h2 className="font-bold text-lg mb-8">プロフィール</h2>
      <div className="flex items-center">
        <div className="mr-14 text-center">
          {profile.image ? (
            <img
              className="w-40 h-40 sm:w-60 sm:h-60 rounded-full mb-5"
              src={profile.image}
            />
          ) : (
            <img
              src="/lazy-weather.jpg"
              alt=""
              className="w-40 h-40 sm:w-60 sm:h-60 rounded-full mb-5"
            />
          )}
        </div>
        <div>
          <div className="flex">
            <CalendarIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">{`お名前: ${
              profile.name ? profile.name : "未登録"
            }`}</p>
          </div>
          <div className="flex">
            <LocationMarkerIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">{`住んでいる地域: ${
              profile.location ? profile.location : "未登録"
            }`}</p>
          </div>
          <div className="flex">
            <BookOpenIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">{`お気に入り数: ${
              movieList.length > 0 ? movieList.length : "未登録"
            }`}</p>
          </div>
          <div className="flex">
            <HeartIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">{`好きなジャンル: ${
              profile.genre ? profile.genre : "未登録"
            }`}</p>
          </div>
          <div className="flex mb-10">
            <TrendingUpIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">{`今期おすすめ: ${
              profile.recommend ? profile.recommend : "未登録"
            }`}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <Link href="/profile/edit">
              <a className="text-white bg-purple-500 rounded px-8 py-2 focus:outline-none mb-5 sm:mr-4 sm:mb-0">
                プロフィールを編集する
              </a>
            </Link>

            {isLogin && (
              <button
                className="text-white bg-purple-500 rounded px-8 py-2 focus:outline-none mb-5 sm:mr-4 sm:mb-0"
                onClick={handelDelete}
              >
                アカウントを削除する
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import {
  BookOpenIcon,
  CalendarIcon,
  LocationMarkerIcon,
  HeartIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";

const Profile = () => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-5">プロフィール</h2>
      <div className="flex items-center">
        <div className="mr-10">
          <img
            src="https://media.kitsu.io/anime/cover_images/42586/original.png?1615204521"
            alt=""
            className="w-72 h-72 rounded-full"
          />
        </div>
        <div>
          <h2 className="font-bold text-lg mb-5">ニックネーム：</h2>
          <div className="flex">
            <CalendarIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">登録日:</p>
          </div>
          <div className="flex">
            <LocationMarkerIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">住んでいる地域:</p>
          </div>
          <div className="flex">
            <BookOpenIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">お気に入り数:</p>
          </div>
          <div className="flex">
            <HeartIcon className="h-5 text-purple-500 mr-2" />
            <p className="mb-3">好きなジャンル:</p>
          </div>
          <div className="flex">
            <TrendingUpIcon className="h-5 text-purple-500 mr-2" />
            <p>今期アニメのおすすめ:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

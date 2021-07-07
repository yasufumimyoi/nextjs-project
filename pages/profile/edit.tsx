import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../redux/user";
import { editFireStore } from "../../firebase/function";
import { PhotographIcon, DocumentIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { firebase } from "../../firebase/config";
import { RootState } from "../../redux/store";
import { ProfileData } from "../../redux/user";

const Edit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile, uid } = useSelector((state: RootState) => state.user);
  const { register, handleSubmit } = useForm();

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageName, setImageName] = useState("");

  const onChange = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const fileList = target.files as FileList;
    const name: string = fileList[0].name;
    const imageData: File = fileList[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(imageData.name);
    await fileRef.put(imageData);
    setImageName(name);
    setImageAsFile(await fileRef.getDownloadURL());
  };

  const onSubmit = async (data: ProfileData) => {
    if (imageName === "") {
      data.image = profile.image;
    } else {
      data.image = imageAsFile;
    }
    editFireStore(uid, data);
    dispatch(setProfile(data));
    setImageName("");
    router.push("/profile");
  };

  return (
    <div className="mx-auto  w-2/3 mt-14 mb-14">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            お名前
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="山田太郎"
            defaultValue={profile.name}
            {...register("name")}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            地域
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="東京都"
            defaultValue={profile.location}
            {...register("location")}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            好きなジャンル
          </label>
          <select
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            {...register("genre")}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              選択してください
            </option>
            <option value="ファンタジー">ファンタジー</option>
            <option value="アクション">アクション</option>
            <option value="ラブコメ">ラブコメ</option>
            <option value="日常">日常</option>
            <option value="スポーツ">スポーツ</option>
            <option value="コメディ">コメディ</option>
            <option value="ホラー">ホラー</option>
            <option value="青春">青春</option>
          </select>
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            今期おすすめ
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder="ゾンビランドサガ"
            defaultValue={profile.recommend}
            {...register("recommend")}
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
            アップロード
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group transition duration-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <PhotographIcon className="w-10 h-10 text-purple-400 group-hover:text-purple-600 transition duration-300" />
                <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider transition duration-300">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                defaultValue={imageAsFile}
                {...register("image")}
                onChange={onChange}
              />
            </label>
          </div>
        </div>

        {imageName && (
          <div className="flex items-center justify-center mt-8">
            <DocumentIcon className="w-10 h-10 text-purple-400" />
            {imageName}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            className="text-white bg-purple-500 rounded px-8 py-2 focus:outline-none"
            type="submit"
          >
            プロフィールを更新する
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

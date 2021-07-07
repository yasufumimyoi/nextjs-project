import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";

export enum Genre {
  Action = "アクション",
  Fantasy = "ファンタジー",
  Romance = "恋愛",
  Life = "日常",
  Sports = "スポーツ",
  Comedy = "コメディ",
  Horror = "ホラー",
  Youth = "青春",
  Empty = "",
}

export type ProfileData = {
  name: string;
  location: string;
  genre: Genre;
  recommend: string;
  image: string;
};

type State = {
  uid: string;
  isLogin: boolean;
  profile: ProfileData;
};

const initialState: State = {
  uid: "",
  isLogin: false,
  profile: {
    name: "",
    location: "",
    genre: Genre.Empty,
    recommend: "",
    image: "",
  },
};

export const fetchProfileData = createAsyncThunk(
  "user/fetchProfileData",
  async (uid: string, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("profile")
        .get();
      if (!dataRef.empty) {
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("profile")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data() as ProfileData;
              dispatch(setProfile(data));
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUid: (state: State, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    removeUid: (state: State) => {
      state.uid = "";
    },
    setLogin: (state: State) => {
      state.isLogin = true;
    },
    logout: (state: State) => {
      state.isLogin = false;
    },
    setProfile: (state: State, action: PayloadAction<ProfileData>) => {
      state.profile = action.payload;
    },
    removeProfile: (state: State) => {
      state.profile = {
        name: "",
        location: "",
        genre: Genre.Empty,
        recommend: "",
        image: "",
      };
    },
  },
});

export const {
  setUid,
  removeUid,
  setLogin,
  logout,
  setProfile,
  removeProfile,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";

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
              dispatch(setProfile(doc.data()));
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

type State = {
  uid: string;
  isLogin: boolean;
  profile: {
    name?: string;
    location?: string;
    genre?: string;
    recommend?: string;
    image?: string;
  };
};

const initialState: State = {
  uid: "",
  isLogin: false,
  profile: {
    name: "",
    location: "",
    genre: "",
    recommend: "",
    image: "",
  },
};

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
    setProfile: (state: State, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    removeProfile: (state: State) => {
      state.profile = {
        name: "",
        location: "",
        genre: "",
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

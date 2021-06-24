import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";

export const fetchProfileData = createAsyncThunk(
  "user/fetchProfileData",
  async (uid, { dispatch }) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    login: false,
    profile: {
      name: "",
      location: "",
      genre: "",
      recommend: "",
      image: "",
    },
  },
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    removeUid: (state) => {
      state.uid = null;
    },
    setLogin: (state) => {
      state.login = true;
    },
    removeLogin: (state) => {
      state.login = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    removeProfile: (state) => {
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
  removeLogin,
  setProfile,
  removeProfile,
} = userSlice.actions;

export default userSlice.reducer;

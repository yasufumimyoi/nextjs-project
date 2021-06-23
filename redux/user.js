import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
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
    signIn: (state, action) => {
      state.users = action.payload;
    },
    logOut: (state) => {
      state.users = null;
    },
    addLogin: (state) => {
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
  signIn,
  logOut,
  addLogin,
  removeLogin,
  setProfile,
  removeProfile,
} = userSlice.actions;

export default userSlice.reducer;

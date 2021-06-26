import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovieData",
  async (uid, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lists")
        .get();
      if (!dataRef.empty) {
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("lists")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              dispatch(setList(doc.data()));
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
    status: "",
  },
  reducers: {
    addList: (state, action) => {
      state.movieList = [action.payload, ...state.movieList];
    },
    removeList: (state, action) => {
      let temp = state.movieList.filter((movie) => movie !== null);
      state.movieList = temp.filter((movie) => movie.id !== action.payload);
    },
    setList: (state, action) => {
      state.movieList.push(action.payload);
    },
    resetList: (state) => {
      state.movieList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieData.fulfilled, (state, action) => {
      if (state.movieList.length > 0) {
        state.movieList.push(action.payload);
      } else {
        state.movieList = [];
      }
      state.status = "success";
    });
    builder.addCase(fetchMovieData.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { addList, removeList, setList, resetList } = movieSlice.actions;

export default movieSlice.reducer;

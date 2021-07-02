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

export const fetchMoreMovieData = createAsyncThunk(
  "movie/fetchMoreMovieData",
  async (url, { getState }) => {
    try {
      const request = await fetch(url);
      const { data } = await request.json();
      const { keyword } = getState().movie;
      const validTitles = data.filter(
        (movie) =>
          movie.attributes.titles.ja_jp && movie.attributes.averageRating
      );

      if (keyword) {
        const selectedData = validTitles
          .map(({ id, attributes }) => {
            const { titles } = attributes;
            if (titles.ja_jp.indexOf(keyword) > 0) {
              return {
                id,
                ...attributes,
                title: attributes.titles.ja_jp,
                image: attributes.posterImage.original,
              };
            }
          })
          .filter((video) => video !== undefined);
        return selectedData;
      } else {
        const selectedData = validTitles.map(({ id, attributes }) => ({
          id,
          ...attributes,
          title: attributes.titles.ja_jp,
          image: attributes.posterImage.original,
        }));
        return selectedData;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    movieList: [],
    keyword: "",
    status: "",
  },
  reducers: {
    addList: (state, action) => {
      state.movieList = [action.payload, ...state.movieList];
    },
    removeList: (state, action) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setList: (state, action) => {
      state.movieList.push(action.payload);
    },
    resetList: (state) => {
      state.movieList = [];
    },
    getMore: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
    resetMore: (state) => {
      state.movies = [];
    },
    addMovies: (state, action) => {
      state.movies = [...action.payload];
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieData.fulfilled, (state) => {
      if (state.movieList.length === 0) {
        state.movieList = [];
      }
      state.status = "success";
    });
    builder.addCase(fetchMovieData.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(fetchMoreMovieData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoreMovieData.fulfilled, (state, action) => {
      state.movies = [...state.movies, ...action.payload];
      state.status = "success";
    });
    builder.addCase(fetchMoreMovieData.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const {
  addList,
  removeList,
  setList,
  resetList,
  getMore,
  resetMore,
  addMovies,
  setKeyword,
} = movieSlice.actions;

export default movieSlice.reducer;

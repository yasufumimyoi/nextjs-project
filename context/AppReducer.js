export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        movieList: [action.payload, ...state.movieList],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        movieList: state.movieList.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    case "SET_ITEM":
      return {
        ...state,
        movieList: [action.payload, ...state.movieList],
      };

    default:
      return state;
  }
};

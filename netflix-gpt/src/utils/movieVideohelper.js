// utils/movieVideoHelper.js
import { addMovieVideo } from "./movieSlice";
import { API_OPTIONS } from "./constants";
export const fetchAndStoreMovieVideo = (movieId, dispatch) => async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    API_OPTIONS
  );
  const json = await data.json();
  const filteredData = json.results.filter(
    (x) => x?.type?.toLowerCase() === "trailer"
  );
  const trailer = filteredData.length ? filteredData[0] : json.results[0];
  dispatch(addMovieVideo(trailer));
};

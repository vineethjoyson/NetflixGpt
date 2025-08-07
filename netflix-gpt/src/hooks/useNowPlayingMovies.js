import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
const useNowPlayingMovies = () => {
  const dipatch = useDispatch();
  const getnowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dipatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    getnowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;

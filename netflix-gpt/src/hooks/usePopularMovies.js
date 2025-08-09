import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
const usePopularMovies = () => {
  const dipatch = useDispatch();
  //for memoization
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dipatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    //for memoization only make callif popular movie is not there
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;

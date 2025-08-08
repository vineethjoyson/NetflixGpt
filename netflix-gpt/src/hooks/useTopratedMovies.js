import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopratedMovies } from "../utils/movieSlice";
const useTopratedMovies = () => {
  const dipatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dipatch(addTopratedMovies(json.results));
  };
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopratedMovies;

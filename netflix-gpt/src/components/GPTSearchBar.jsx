import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
// import openAi from "../utils/openAi";
import getMoviesFromPrompt from "../utils/moveReccomendation";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GPTSearchBar = () => {
  const langKey = useSelector((state) => state.config.lang);
  const saerchText = useRef(null);
  const dispatch = useDispatch(); //searchMovie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };
  const handleGptSearchclick = async () => {
    console.log("searchtext", saerchText.current.value);
    //Make an api call to GPT api and get movie results
    // const gptQuery = `Act as a Movie reccomendation system and suggest some movies for the query${saerchText.current.value}. Only give names of 5 movies , comma separated like the exaple results ahead. Example Result: lion King, IronMan, E.t`;
    // const gptresults = await openAi.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: gptQuery }],
    // });
    // console.log(gptresults.choices[0].message.content);
    if (!saerchText.current.value) {
      dispatch(addGptMovieResult({ movieNames: null, movieResults: null }));
    } else {
      const movierecommendation = await getMoviesFromPrompt(
        saerchText.current.value
      );

      const gptMovies = movierecommendation.split(",");
      console.log("movieList", gptMovies);
      // For each movie I will search TMDB API

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    }
  };
  return (
    <div className="pt-[10%]">
      <form
        className=" w-11/12  md:w-1/2 bg-black flex m-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={saerchText}
          type="text"
          className="p-4 m-4 w-9/12 rounded-md text-xs md:text-lg"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="py-4 px-4 w-3/12 m-4 bg-red-700 text-white rounded-md"
          onClick={handleGptSearchclick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;

import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopratedMovies from "../hooks/useTopratedMovies";
import GPTSearchPage from "./GPTSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearchview = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies(); //custom hook to fetch now playing movies and update the movie sliec in redux
  usePopularMovies();
  useTopratedMovies();
  return (
    <div>
      {/*
        MainContainer
          -VideoBackground
          -Video Title
        secondryContainer
          - MovieList*n
            - MovieCards*n 
        */}
      <Header />
      {showGptSearchview ? (
        <GPTSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;

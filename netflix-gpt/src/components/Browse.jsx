import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopratedMovies from "../hooks/useTopratedMovies";
const Browse = () => {
  useNowPlayingMovies(); //custom hook to fetch now playing movies and update the movie sliec in redux
  usePopularMovies();
  useTopratedMovies();
  return (
    <div>
      <Header />

      {/*
        MainContainer
          -VideoBackground
          -Video Title
        secondryContainer
          - MovieList*n
            - MovieCards*n 
        */}
      <MainContainer />

      <SecondaryContainer />
    </div>
  );
};

export default Browse;

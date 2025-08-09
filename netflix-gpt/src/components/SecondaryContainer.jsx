import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // if (!movies.nowPlayingMovies || !movies.popularMovies) return;
  return (
    <div className="bg-black">
      {/*
    MovieList-Popular
        movieCard*n
    movieList- Now playing
    movieList- trending
so on...

    */}
      <div className=" mt:0 md:-mt-32 relative z-20 ">
        {movies.nowPlayingMovies && (
          <MovieList title={"Now playing"} movies={movies.nowPlayingMovies} />
        )}
        {movies.popularMovies && (
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        )}
        {movies.topRatedmovies && (
          <MovieList title={"Top Rated"} movies={movies.topRatedmovies} />
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;

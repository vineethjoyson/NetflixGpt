import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log("movies", movies);
  return (
    <div className="p-3">
      <h1 className="font-bold text-2xl py-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide scrollbarWidth: 'none'">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterpath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

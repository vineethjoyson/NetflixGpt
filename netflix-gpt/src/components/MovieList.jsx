import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-1 md:p-3">
      <h1 className="font-bold text-lg md:text-2xl py-2 text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-hide p-2 md:p-6">
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

import { IMG_CDN } from "../utils/constants";
import { fetchAndStoreMovieVideo } from "../utils/movieVideohelper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const MovieCard = ({ posterpath, movieId }) => {
  const dispatch = useDispatch();
  const handleClick = fetchAndStoreMovieVideo(movieId, dispatch);
  if (!posterpath) return null;
  // const getMovieVideo = useMovieVideo(movieId);

  return (
    <div>
      <Link to={`/play/${movieId}`} onClick={handleClick}>
        <img
          className="min-w-[120px] md:min-w-[220px] shrink-0  transition-transform duration-300 transform hover:scale-110 cursor-pointer w-36 md:w-48 pr-4"
          src={`${IMG_CDN}${posterpath}`}
          alt="Movie Card"
        />
      </Link>
    </div>
  );
};

export default MovieCard;

import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterpath }) => {
  if (!posterpath) return null;
  return (
    <div>
      <img
        className="min-w-[120px] md:min-w-[220px] shrink-0  transition-transform duration-300 transform hover:scale-110 cursor-pointer w-36 md:w-48 pr-4"
        src={`${IMG_CDN}${posterpath}`}
        alt="Movie Card"
      />
    </div>
  );
};

export default MovieCard;

import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterpath }) => {
  return (
    <div>
      <img
        className="min-w-[220px] shrink-0 pr-2 transition-transform duration-300 transform hover:scale-110 cursor-pointer"
        src={`${IMG_CDN}${posterpath}`}
        alt="Movie Card"
      />
    </div>
  );
};

export default MovieCard;

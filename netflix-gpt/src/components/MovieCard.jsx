import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterpath }) => {
  return (
    <div>
      <img
        className="min-w-[220px] shrink-0 pr-2"
        src={`${IMG_CDN}${posterpath}`}
        alt="Movie Card"
      />
    </div>
  );
};

export default MovieCard;

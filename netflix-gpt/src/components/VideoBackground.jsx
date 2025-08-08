import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
const VideoBackground = ({ movieId }) => {
  //fetch trailer
  useMovieTrailer(movieId);

  const trailerdetails = useSelector((store) => store.movies.trailerVideo);
  if (trailerdetails == null) return;
  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerdetails.key}?&autoplay=1&mute=1&loop=1&playlist=${trailerdetails.key}&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

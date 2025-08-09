import { useSelector } from "react-redux";
const VideoPlayback = ({ movieId }) => {
  //fetch trailer
  const movieVideo = useSelector((store) => store.movies.MovieVideo);
  // if (trailerdetails == null) return;
  // let videoKey;
  // if (movieVideo != null && type == "player") {
  //   videoKey = movieVideo.key;
  // } else {
  //   videoKey = trailerdetails.key;
  // }
  if (movieVideo == null) return;
  const videoKey = movieVideo?.key;
  return (
    <div>
      <iframe
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-0 w-[100vh] h-[100vw] object-cover md:w-screen md:h-screen md:aspect-video"
        src={`https://www.youtube.com/embed/${videoKey}?&autoplay=1&mute=1&loop=1&playlist=${videoKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoPlayback;
// absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-0 w-[100vh] h-[100vw] object-cover

// w-screen h-screen aspect-video rotate-90 md:rotate-0

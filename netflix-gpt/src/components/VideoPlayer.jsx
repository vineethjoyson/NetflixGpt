import { useParams } from "react-router-dom";
import VideoPlayback from "./VideoPlayback";
import { useDispatch } from "react-redux";
import { removeMovieVideo } from "../utils/movieSlice";
import { useEffect } from "react";
const VideoPlayer = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // assuming route param is named 'id'

  useEffect(() => {
    return () => {
      dispatch(removeMovieVideo());
    };
  }, [dispatch]);

  return (
    <div>
      <VideoPlayback movieId={movieId} />
    </div>
  ); // render the value
};

export default VideoPlayer;

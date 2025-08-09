import { useSelector } from "react-redux";
import Videotitle from "./Videotitle";
import VideoBackground from "./VideoBackground";
const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies == null) return; //to handle firt case when the value is null (also called early retuen)
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="pt-[40%] bg-black md:pt-0">
      <Videotitle title={original_title} description={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

import "../App.css";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/play/:movieId", //Dynamic
      element: <VideoPlayer />,
    },
  ]);

  //this is a side loading hence useEffect only specific to firebase we have this thing and this will run once the auth action takes place. signIn,signOut,signUp

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

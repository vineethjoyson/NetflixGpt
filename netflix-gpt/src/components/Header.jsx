import { LOGO, USER_AVATAR } from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeuser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  //We did all the routing mechanism here only navigation is mentioned here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //for each auth status change
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeuser());
        navigate("/");
      }
    });
    return () => unsubscribe(); //firebase thing to unmount so that we can avoid memory leakage
  }, []);
  return (
    <div className="  Login w-screen absolute px-6 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="" />
      {user && (
        <div className="flex p-2 ">
          <img className="w-12 h-12" src={USER_AVATAR} alt="userIcon" />
          <button onClick={handleSignOut} className="text-white font-bold">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

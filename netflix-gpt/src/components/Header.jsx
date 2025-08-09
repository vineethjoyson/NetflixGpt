import { LOGO, SUPPORTED_LANGUAGE, USER_AVATAR } from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeuser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearchview = useSelector((store) => store.gpt.showGptSearch);

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
  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
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

  const handleSearchGPTClick = () => {
    //toggle GPT Search button
    dispatch(toggleGptSearchView());
  };
  return (
    <div className="  Login w-screen absolute px-6 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="" />
      {user && (
        <div className="flex p-2 ">
          {showGptSearchview && (
            <select
              className="p-2 m-2 bg-gray-900 bg-opacity-40 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang, index) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-1 px-4 mx-4 my-2 bg-red-700  md:hover:bg-opacity-50 text-white rounded-md"
            onClick={handleSearchGPTClick}
          >
            {showGptSearchview ? <p>Home</p> : <p>search</p>}
          </button>
          <div className=" flex md:flex md:flex-col ">
            <img
              className="hidden md:inline-block w-12 h-12 rounded-lg"
              src={USER_AVATAR}
              alt="userIcon"
            />
            <button onClick={handleSignOut} className="text-white font-bold">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

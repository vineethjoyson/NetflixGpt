import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  // const navigate = useNavigate(); //navigation to another page
  const dispatch = useDispatch();
  const toggleSignInForn = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    //validate data
    const message = checkValidateData(
      email.current.value,
      password.current.value,
      name?.current?.value,
      isSignInForm
    );
    if (!message) {
      //null so its valid compination so go ahead with signup/signIn
      if (!isSignInForm) {
        //sign Up logic   https://firebase.google.com/docs/auth/web/password-auth?_gl=1*wcgq3p*_up*MQ..&gclid=CjwKCAjw7rbEBhB5EiwA1V49nYYfMFahJ9GfQJf12vk_GQhiSMf9ih67AhExt3uBeCF0bGkjddyuGRoCZe8QAvD_BwE&gclsrc=aw.ds&gbraid=0AAAAADpUDOin1a9B1gVNLnXFrh57ObGAU#create_a_password-based_account
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password?.current?.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name?.current?.value,
            })
              .then(() => {
                // Profile updated!
                // ...
                const { uid, email, displayName } = auth.currentUser; //to  get the details afetr the profile update
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((error) => {
                // An error occurred
                // ...
                setErrorMessage(error.message);
              });

            // ideally we need to dispatch action here so that we can update the store but firebase have some utility that we will use

            setErrorMessage("");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setErrorMessage(errorCode + "- " + errorMessage);
          });
      } else {
        //sign in logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password?.current?.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            setErrorMessage("");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "- " + errorMessage);
          });
      }
    } else {
      setErrorMessage(message);
    }

    // checkValidateData();
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="bg" />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 sm:p-10 bg-black text-white bg-opacity-80 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 sm:p-4 mb-4 w-full bg-gray-700 rounded"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 sm:p-4 mb-4 w-full bg-gray-700 rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 sm:p-4 mb-4 w-full bg-gray-700 rounded"
        />

        {errorMessage && (
          <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
        )}

        <button
          className="p-3 sm:p-4 mb-4 bg-red-700 w-full rounded-lg hover:bg-red-800 transition"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-sm sm:text-base cursor-pointer text-gray-300 hover:text-white"
          onClick={toggleSignInForn}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;

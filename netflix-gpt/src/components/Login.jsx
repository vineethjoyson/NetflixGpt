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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate(); //navigation to another page
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
    console.log(message);
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
            console.log(user);
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
                navigate("/browse");
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
            console.log(user);
            navigate("/browse");
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
    <div>
      <Header />
      <div>
        <img className="absolute " src={BG_URL} alt="" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute   p-12 w-3/12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-slate-600 "
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600"
        />

        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-slate-600 "
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button
          className="p-4 my-4 bg-red-800 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForn}>
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

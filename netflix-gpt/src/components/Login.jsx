import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

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
    setErrorMessage(message);

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

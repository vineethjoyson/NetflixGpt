import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState } from "react";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForn = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div>
        <img className="absolute" src={BG_URL} alt="" />
      </div>
      <form className=" absolute   p-14 w-3/12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600"
        />
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-slate-600 "
          />
        )}

        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-slate-600 "
        />
        <button className="p-4 my-4 bg-red-800 w-full rounded-lg">
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

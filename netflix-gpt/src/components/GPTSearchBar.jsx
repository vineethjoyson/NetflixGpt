import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
const GPTSearchBar = () => {
  const langKey = useSelector((state) => state.config.lang);
  return (
    <div className="pt-[10%]">
      <form className=" w-1/2 bg-black flex m-auto">
        <input
          type="text"
          className="p-4 m-4 w-9/12 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="py-4 px-4 w-3/12 m-4 bg-red-700 text-white rounded-md">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;

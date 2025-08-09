import GPTMovieSuggestion from "./GPTMovieSuggestion";
import GPTSearchBar from "./GPTSearchBar";
import { BG_URL } from "../utils/constants";
const GPTSearchPage = () => {
  return (
    <div>
      {
        //gpt searchBar
        //gpt movie Suggestion
      }
      <div className="fixed inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="bg" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestion />
    </div>
  );
};

export default GPTSearchPage;

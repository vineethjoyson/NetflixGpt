import { LOGO } from "../utils/constants";
const HeaderBrowser = () => {
  return (
    <div className="Login w-screen absolute px-6 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44" src={LOGO} alt="" />
    </div>
  );
};

export default HeaderBrowser;

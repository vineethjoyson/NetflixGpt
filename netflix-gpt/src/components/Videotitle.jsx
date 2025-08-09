const Videotitle = ({ title, description }) => {
  return (
    <div className=" w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{description}</p>
      <div className="my-2 md:my-0">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-10  text-lg rounded-md hover:bg-opacity-70">
          ▶Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white  py-4 px-10 text-lg bg-opacity-50 rounded-md mx-2 hover:bg-opacity-70">
          More Infoℹ️
        </button>
      </div>
    </div>
  );
};

export default Videotitle;

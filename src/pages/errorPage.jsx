import error from "../assets/error.svg";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
const errorPage = () => {
  return (
    <div className="w-full bg-dark h-[100vh] flex flex-col justify-center items-center">
      <img
        src={error}
        className="w-full p-5 md:w-1/2 mx-auto object-cover "
        alt=""
      />
      <h1 className="text-4xl text-gray-200 m-4">
        <span className="text-purple-500">404 </span>
        Page not found
      </h1>
      <Link to={"/"}>
        <button className="px-5 mx-auto py-2  text-white  bg-purple-500">
          <ArrowBack /> Back to Home
        </button>
      </Link>
    </div>
  );
};

export default errorPage;

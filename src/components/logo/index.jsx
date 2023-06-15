import { FaSpaceShuttle } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { TbSignature } from "react-icons/tb";
const Logo = ({ isBlack }) => {
  return (
    <div
      className={`font-bold flex items-center text-2xl ${
        isBlack ? "text-[#fff]" : "text-white"
      }  uppercase `}
    >
      <span className="text-purple-500">
        <TbSignature />
      </span>
      spacecamp
      <span className="text-purple-500">
        <FaSpaceShuttle />
      </span>{" "}
    </div>
  );
};

export default Logo;

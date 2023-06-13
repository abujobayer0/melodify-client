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
      Melodify{" "}
      <span className="text-purple-500">
        <GiMusicalScore />
      </span>{" "}
    </div>
  );
};

export default Logo;

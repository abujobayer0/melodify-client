import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.card.css";
import { TbBan } from "react-icons/tb";
import { Chat } from "@mui/icons-material";
const StudentCard = ({ student, handleBan }) => {
  const { name, email, image } = student;
  return (
    <div className="container transition-all  ease-in-out delay-0">
      <div className="box  ">
        <div className="content">
          <div className="w-32 h-32 my-2 mx-auto overflow-hidden rounded-full">
            <img src={image} className="w-full mx-auto object-cover" />
          </div>
          <h2 className="text-2xl flex flex-nowrap w-full justify-center items-center mx-auto text-center">
            {name}
          </h2>
          <p className="text-sm my-2 flex justify-center items-center mx-auto">
            {email}
          </p>
          <div className="flex  gap-4">
            <button onClick={() => handleBan(email)} className="px-4 b py-2  ">
              <h5 className="flex items-center">
                <TbBan />
                Ban
              </h5>
            </button>
            <button className="px-4 a py-2 ">
              <h5 className="flex items-center">
                <Chat />
                Message
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

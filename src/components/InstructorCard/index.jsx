import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.card.css";
const InstructorCard = ({ instructor }) => {
  const { name, image, email } = instructor;
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
          <Link to={`/instructor/${email}`}>
            <a href="#" className="a">
              <h5 className="flex items-center">
                <FaEye />
                visit profile
              </h5>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;

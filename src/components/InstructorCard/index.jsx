import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.card.css";
const InstructorCard = ({ instructor }) => {
  const { name, image, email } = instructor;
  return (
    <div className="container transition-all  ease-in-out delay-0">
      <div className="box ">
        <div className="content">
          <img src={image} className="w-32 h-32 mx-auto rounded-full" />
          <h2 className="">{name}</h2>
          <p>{email}</p>
          <a href="#">
            <Link to={`/instructor/${email}`}>See more</Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;

import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const InstructorCard = ({ instructor }) => {
  const { name, image, email } = instructor;
  return (
    <div className="space-y-4 bg-lightCard p-2 rounded">
      <img
        alt=""
        className="object-cover w-72 sm:w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
        style={{ objectPosition: "top" }}
        src={
          image
            ? image
            : "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
        }
      />
      <div className="flex flex-col items-center">
        <h4 className="text-xl font-semibold">{name}</h4>
        <p className="text-sm dark:text-gray-400">Instructor</p>
        <p className="text-sm flex items-center gap-2 dark:text-gray-400">
          <FaEnvelope /> {email}
        </p>
        <Link to={`/instructor/${email}`}>
          <div
            title="See Profile"
            className="relative px-4 rounded-none my-4 hover:bg-[#111827] hover:rounded-full transition-all ease-in-out viewButton py-4 z-50"
          >
            <FaArrowRight className=" text-gray-200 cursor-pointer  right-2 z-50" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;

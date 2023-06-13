import { FaChair, FaDollarSign, FaUser } from "react-icons/fa";

const PopularClassCard = ({ item, handleSelect, dark }) => {
  const {
    image,
    name,
    detail,
    instructor,
    available_seat,
    price,
    instructorIcon,
    enroll,
  } = item.newClass;

  const role = localStorage.getItem("role");

  return (
    <div
      className={`flex flex-col shadow-xs md:shadow-md ${
        available_seat === 0 ? "bg-red-900" : "bg-[#1b2640]"
      } instructor  h-fit lg:shadow-lg max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-gray-100`}
    >
      <div className="flex space-x-4">
        <img
          alt=""
          src={instructorIcon}
          className="object-cover bg-top w-12 h-12 rounded-full shadow dark:bg-gray-500"
        />
        <div className="flex flex-col space-y-1">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm  font-semibold"
          >
            {instructor}
          </a>
          <span className="text-xs text-start dark:text-gray-400">
            Instructor
          </span>
        </div>
      </div>
      <div>
        <img
          src={image}
          alt=""
          className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
        />
        <h2 className="mb-1 text-xl font-semibold">
          {name.length > 50 ? name.slice(0, 50) + "..." : name}
        </h2>
        <p className="text-sm dark:text-gray-400">
          {detail?.length > 80 ? detail?.slice(0, 80) + "..." : detail}
        </p>
      </div>
      <div className="flex flex-wrap md:flex-nowrap z-50 justify-center gap-2 md:gap-0 md:justify-between">
        <div
          className={`w-full ${
            !dark ? " homeButton" : "bg-white text-purple-700 rounded"
          }
         `}
        >
          <button
            className={`w-full z-10   font-semibold py-4 rounded-lg ${
              role === "instructor" || role === "admin" || available_seat === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleSelect(item)}
            disabled={
              role === "instructor" || role === "admin" || available_seat === 0
            }
          >
            {available_seat === 0
              ? "Class Full"
              : role === "admin"
              ? "Admin not  allow"
              : role === "instructor"
              ? "Instructor not allow"
              : "SELECT"}
          </button>
        </div>
        <div className="flex mx-4 space-x-2 text-sm  text-gray-200">
          <span className="flex text-lg font-semibold items-center p-1 space-x-1.5">
            <FaChair />
            <span>{available_seat}</span>
          </span>
          <span className="flex text-lg font-semibold items-center p-1 space-x-1.5">
            <FaUser />
            <span>{enroll?.length || 0}</span>
          </span>

          <span className="flex font-semibold text-lg items-center">
            <FaDollarSign /> {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularClassCard;

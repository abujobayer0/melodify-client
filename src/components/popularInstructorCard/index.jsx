import { BsCameraVideo } from "react-icons/bs";
import { FaArrowRight, FaUsers } from "react-icons/fa";
const PopularInstructorCard = ({ item }) => {
  const {
    instructor,
    instructorImage,
    instructorEmail,
    totalEnrollments,
    approvedCourseCount,
  } = item;
  return (
    <div
      className="flex  PopularInstructorCard mx-auto  w-full   flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-10 
        bg-dark text-gray-100"
    >
      <img
        src={instructorImage}
        style={{ objectPosition: "top" }}
        alt=""
        className="w-32 h-32   mx-auto object-cover   rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 z-50 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl flex justify-center  font-semibold sm:text-2xl">
            {instructor}
          </h2>
          <p className="px-5 w-44  text-center mx-auto text-xs md:text-sm  flex justify-center dark:text-gray-400">
            {instructorEmail}
          </p>
        </div>
        <div className="flex text-gray-300 font-semibold justify-center pt-2 space-x-4 align-center">
          <span className="flex items-center  gap-2 border-r-2 pr-4 border-gray-400">
            <FaUsers /> {totalEnrollments}
          </span>
          <span className="flex items-center gap-2">
            <BsCameraVideo /> {approvedCourseCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructorCard;

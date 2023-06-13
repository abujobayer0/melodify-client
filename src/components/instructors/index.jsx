import { useState } from "react";
import PrimaryProgress from "../progress";
import { useEffect } from "react";
import PopularInstructorCard from "../popularInstructorCard";

const Instructors = () => {
  const [popularInstructor, setPopularInstructors] = useState([]);
  useEffect(() => {
    fetch("https://melodify-server.onrender.com/popular/instructors")
      .then((res) => res.json())
      .then((data) => setPopularInstructors(data));
  }, []);
  return (
    <section className="py-6 home bg-dark bg instructor dark:bg-gray-800 text-gray-100">
      <div className="  p-4 mx-auto  py-16 sm:p-10">
        <div className="space-y-4 ">
          <h3 className="text-2xl  text-gray-100 font-bold leading-none sm:text-5xl">
            Popular Instructors
          </h3>
          <p className="max-w-2xl mx-auto   text-gray-400">
            Discover the Art of Musical Mastery: Meet our Dedicated Music
            Instructors Who Bring Passion, Skill, and Years of Experience to
            Guide You on Your Journey.
          </p>
        </div>
        <div className="grid w-full mt-10  grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {popularInstructor.map((instructor, indx) => (
            <PopularInstructorCard key={indx} item={instructor} />
          ))}
        </div>
        {popularInstructor.length === 0 && <PrimaryProgress />}
      </div>
    </section>
  );
};

export default Instructors;

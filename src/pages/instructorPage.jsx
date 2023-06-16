import { useEffect } from "react";
import { Footer, InstructorCard, NavBar, PrimaryProgress } from "../components";
import { Divider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase.init";
import axios from "axios";
import { useGetData } from "../hooks/useGetData";
const auth = getAuth(app);
const InstructorsPage = () => {
  const [user] = useAuthState(auth);

  const { data, isLoading, error } = useGetData("/instructors");
  console.log(error);
  useEffect(() => {
    if (user?.displayName) {
      axios
        .get(`https://melodify-server.onrender.com/user?email=${user?.email}`)
        .then((response) => {
          const data = response.data;
          localStorage.setItem("role", data[0]?.role);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="bg-dark home">
      <NavBar isBlack />
      <Divider />
      <section className="py-6 bg-dark text-gray-100">
        <div className=" p-4 mx-auto space-y-16 sm:p-10">
          <div className="">
            <h3 className="text-2xl font-bold leading-none text-gray-100 sm:text-5xl">
              Meet our Instructors
            </h3>
            <p className="max-w-2xl pt-4 mx-auto text-gray-400">
              Discover the Finest Pop Music Instructors: Unlock Your Musical
              Potential with Expert Guidance!
            </p>
          </div>
          <div className="grid w-full transition-all ease-in-out grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 justify-items-center  items-center lg:grid-cols-3">
            {data?.map((instructor, indx) => (
              <InstructorCard key={indx} instructor={instructor} />
            ))}
          </div>
          {isLoading && <PrimaryProgress />}
        </div>
      </section>
      <Footer isDarkMode />
    </div>
  );
};

export default InstructorsPage;

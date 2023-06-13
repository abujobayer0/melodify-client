import { Divider } from "@mui/material";
import { NavBar, Footer } from "../components";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase.init";
import { useGetData } from "../hooks/useGetData";
import { FaEnvelope } from "react-icons/fa";

const auth = getAuth(app);
const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const {
    data: student,
    isLoading: loading,
    error,
  } = useGetData(`/user?email=${user?.email}`);
  console.log(error);
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <Divider />

      <main className="  bg-dark">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full home  bg-center object-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full left-0 absolute opacity-70 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative  py-16 bg-dark">
          <div
            className="container mx-auto  px-4"
            style={{ boxShadow: "none" }}
          >
            <div className="relative flex flex-col min-w-0 break-words bg-lightCard w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-44 overflow-hidden flex justify-center items-center object-cover rounded-full h-44 -mt-20 md:-mt-16">
                      <img
                        alt="..."
                        src={
                          !loading
                            ? student[0]?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqo3RO1_w9lL_-wI2wmq3EFZroPIq1N_O1Kya335faA&s"
                        }
                        className="shadow-xl  object-cover align-middle border-none absolute  h-auto w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 md:mt-32 sm:mt-0"></div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center text-gray-200 py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                          22
                        </span>
                        <span className="text-sm text-gray-200">Selected</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                          10
                        </span>
                        <span className="text-sm text-gray-200">Enrolled</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl  font-bold block uppercase tracking-wide bg-green-500 px-4 py-2 rounded-md text-white">
                          {!loading && <>{student[0]?.role}</>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-gray-200 mb-2">
                    {!loading && <>{student[0]?.name}</>}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold uppercase">
                    <span className="flex mx-auto justify-center items-center gap-2">
                      <FaEnvelope className="text-gray-300" />
                      {!loading && <>{student[0]?.email} </>}
                    </span>
                  </div>

                  <div className="mb-2 text-gray-300 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-300"></i>
                    Comming Soon..
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer isDarkMode />
    </div>
  );
};

export default ProfilePage;

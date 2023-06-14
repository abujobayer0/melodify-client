import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import { NavBar, Footer } from "../";
import { FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";

import { useGetData } from "../../hooks/useGetData";
import VideoButton from "../videoButton";
import { getAuth } from "firebase/auth";
import app from "../../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import PopularClassCard from "../popularClassCard";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ExpandMore, Send } from "@mui/icons-material";
import { useEffect } from "react";
import {
  BsFillFastForwardBtnFill,
  BsFillPatchQuestionFill,
} from "react-icons/bs";
const auth = getAuth(app);
const InstructorProfile = () => {
  const { email } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [email]);
  const {
    data: instructor,
    isLoading: loading,
    error: classError,
  } = useGetData(`/user?email=${email}`);
  console.log(classError);
  const {
    data: classes,
    isLoading,
    error,
  } = useGetData(`/instructor/classes?email=${email}`);
  const {
    data: enrollStudent,
    isLoading: enrollCountLoading,
    error: enrollCountError,
  } = useGetData(`/enroll/totalLength?email=${email}`);
  const {
    data: totalSelected,
    isLoading: selectedLoading,
    error: selectedError,
  } = useGetData(`/user/selectedClass?email=${user?.email}`);
  const approvedClasses = classes?.filter(
    (i) => i.newClass.status === "approved"
  );
  console.log(error);
  console.log(totalSelected);
  const activeCount = classes?.reduce((count, item) => {
    if (item.newClass.status === "approved") {
      count++;
    }
    return count;
  }, 0);
  const mineSelected = totalSelected?.filter(
    (i) => i.selectedClass?.newClass?.email === email
  );

  const mySelectUnderInstructor = mineSelected?.length;
  const handleSelect = (selectedClass) => {
    const selectedClasses = {
      email: user?.email,
      classItem: selectedClass,
    };

    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login To Select !",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-container",
          icon: "custom-swal-icon",
        },
      });
      navigate("/login");
      return;
    }

    axios
      .post(
        "https://melodify-server.onrender.comuser/selectedClass",
        selectedClasses,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        if (data.acknowledged === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Selected Successfully",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "custom-swal-container",
              icon: "custom-swal-icon",
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Class Already Selected",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal-container",
            icon: "custom-swal-icon",
          },
        });
      });
  };
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <Divider />

      <main className="  bg-dark">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full   bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full left-0 absolute opacity-50 bg-black"
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
        <section className="relative pt-16 bg-dark">
          <div
            className="container mx-auto  px-4"
            style={{ boxShadow: "none" }}
          >
            <div className="relative flex flex-col  min-w-0 break-words bg-lightCard w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-44 overflow-hidden flex justify-center items-center object-cover rounded-full border-4 object-top   border-purple-600 h-44 -mt-20 md:-mt-16">
                      <img
                        alt="..."
                        src={
                          !loading
                            ? instructor[0]?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqo3RO1_w9lL_-wI2wmq3EFZroPIq1N_O1Kya335faA&s"
                        }
                        style={{ objectPosition: "top" }}
                        className="shadow-xl  top-0 scale-110 object-fill bg-center align-middle border-none  absolute  h-auto w-full"
                      />
                    </div>
                  </div>
                  <div
                    className="w-full lg:w-4/12 px-4 lg:order-3  lg:text-right rounded lg:flex hidden justify-center  items-center lg:self-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="pb-6 px-3 lg:mt-32  sm:mt-0">
                      <VideoButton />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 pt-4 lg:order-1">
                    <div className="flex justify-start flex-wrap  text-gray-200 pb-2 lg:pt-4 ">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                          {mySelectUnderInstructor
                            ? mySelectUnderInstructor
                            : 0}
                        </span>
                        <span className="text-sm text-gray-200">
                          You Selected
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                          {activeCount ? activeCount : 0}
                        </span>
                        <span className="text-sm text-gray-200">Classes</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                          {enrollStudent ? enrollStudent.totalLength : 0}
                        </span>
                        <span className="text-sm text-gray-200">Students</span>
                      </div>
                    </div>
                    <div className="text-start mb-12">
                      <h3 className="text-4xl font-semibold leading-normal  text-gray-200 mb-2">
                        {!loading && <>{instructor[0]?.name}</>}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold ">
                        <span className="flex mx-auto justify-start items-center gap-2">
                          <FaEnvelope className="text-gray-300" />
                          {!loading && <>{instructor[0]?.email} </>}
                        </span>
                      </div>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-300"></i>
                        {!loading && (
                          <>
                            {instructor[0]?.adress
                              ? instructor[0]?.adress
                              : "Unknown"}{" "}
                          </>
                        )}
                      </div>
                      <div className="text-sm leading-normal flex items-center gap-2 mt-0 mb-2 text-purple-500 font-bold uppercase">
                        <FaChalkboardTeacher />
                        {!loading && <>{instructor[0]?.role}</>}
                      </div>
                    </div>
                  </div>
                </div>
                <Accordion sx={{ padding: 0 }}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore
                        sx={{ backgroundColor: "#1b2640", color: "#a855f7" }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: "#1b2640", color: "#fff" }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        fontSize: { sm: "sm", md: "lg" },
                        alignItem: "center",
                      }}
                    >
                      <span className="text-purple-500 flex items-center gap-2 px-2">
                        {!loading && <>{instructor[0]?.name}</>}
                        <BsFillPatchQuestionFill />
                      </span>
                      ask any query?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#1b2640", color: "#fff" }}
                  >
                    <Typography>
                      <form>
                        <div className="input-box gap-0 flex items-center">
                          <BsFillPatchQuestionFill className="text-purple-500 text-xl mx-2 " />

                          <input
                            type="email"
                            placeholder="Enter your Question ??"
                            name="email"
                            className="px-5 w-full outline-dashed outline-purple-500 focus:border-none border-none focus:outline-purple-500 bg-lightCard"
                          />
                          <Button sx={{ color: "#a855f7", outline: "none" }}>
                            <Send />
                          </Button>
                        </div>
                      </form>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
      <h1 className="text-4xl font-semibold  pb-24 text-gray-200">
        See
        <span className="px-2 uppercase text-purple-500">
          {!loading && <>{instructor[0]?.name}</>}
        </span>
        Classes
      </h1>
      <section className="min-h-screen grid gap-4 py-5 px-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 home w-full bg-[#1b2640">
        {approvedClasses?.map((i, indx) => (
          <PopularClassCard handleSelect={handleSelect} item={i} key={indx} />
        ))}
      </section>
      <Footer isDarkMode />
    </div>
  );
};

export default InstructorProfile;

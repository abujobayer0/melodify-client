import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import { NavBar, Footer } from "../";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChalkboardTeacher,
  FaEnvelope,
} from "react-icons/fa";

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
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
const auth = getAuth(app);
const InstructorProfile = () => {
  const { email } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [email]);
  const { data: instructor, isLoading: loading } = useGetData(
    `/user?email=${email}`
  );
  console.log(instructor);
  const { data: classes } = useGetData(`/instructor/classes?email=${email}`);
  const { data: enrollStudent } = useGetData(
    `/enroll/totalLength?email=${email}`
  );
  const { data: totalSelected } = useGetData(
    `/user/selectedClass?email=${user?.email}`
  );
  const {
    data: qa,
    isLoading: qaLoading,
    refetch,
  } = useGetData(
    `/question-answer?email=${user?.email}&&instructorEmail=${email}`
  );
  const approvedClasses = classes?.filter(
    (i) => i.newClass.status === "approved"
  );

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

  const { data: enrolled } = useGetData(
    `/enrolled/single/instructor?email=${user?.email}&&instructorEmail=${email}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const question = form.question.value;
    if (!user?.email) {
      navigate("/login");
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please login before send a message? !",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal-container",
          icon: "custom-swal-icon",
        },
      });
      return;
    }
    const QA = {
      question: question,
      user: user,
      instructor: !loading && instructor[0],
    };

    if (question) {
      fetch("https://melodify-server.onrender.com/user/question-answers", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ QA }),
      })
        .then((res) => res.json())
        .then((data) => console.log("datas", data));
      toast.success("Message sent!");
      refetch();
      form.reset();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Can't send emty question !",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-container",
          icon: "custom-swal-icon",
        },
      });
    }
  };

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
        "https://melodify-server.onrender.com/user/selectedClass",
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
  console.log(qa);
  const role = localStorage.getItem("role");
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <Divider />
      <Toaster />
      <main className="  bg-dark">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full   bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1518972559570-7cc1309f3229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")',
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
                    className="w-full lg:w-4/12 px-4 lg:order-3 my-4 md:my-0  lg:text-right rounded lg:flex  justify-center  items-center lg:self-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="pb-6 px-3 lg:mt-32  sm:mt-0">
                      <VideoButton iframe={!loading && instructor[0]?.iframe} />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 pt-4 lg:order-1">
                    <div className="flex justify-start flex-wrap  text-gray-200 pb-2 lg:pt-4 ">
                      {instructor && (
                        <>
                          {role === "student" && (
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
                          )}
                        </>
                      )}
                      {instructor && (
                        <>
                          {role === "student" && (
                            <div className="mr-4 p-3 text-center">
                              <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                                {enrolled ? enrolled?.count : 0}
                              </span>
                              <span className="text-sm text-gray-200">
                                You Enrolled
                              </span>
                            </div>
                          )}
                        </>
                      )}
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
                            {instructor[0]?.address
                              ? instructor[0]?.address
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
                {!loading && (
                  <Accordion
                    disabled={
                      !loading && (role === "instructor" || role === "admin")
                    }
                    sx={{ padding: 0 }}
                  >
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
                        {role === "instructor" || role === "admin"
                          ? "admin and instructor can't send question"
                          : "ask any query?"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ backgroundColor: "#1b2640", color: "#fff" }}
                    >
                      <Typography>
                        <div>
                          {!qaLoading && (
                            <div className="w-full max-h-96 overflow-y-auto">
                              {qa?.map((item) => (
                                <div className="border-2 border-gray-500 rounded-lg my-4 px-2 md:px-5">
                                  <h1 className="text-end flex flex-col  text-gray-200 my-2">
                                    <span className="text-xs flex my-2 justify-end items-center gap-2 text-green-500">
                                      {item?.user?.displayName}
                                      <img
                                        src={item?.user?.photoURL}
                                        className="w-6 rounded-full h-6"
                                        alt=""
                                      />
                                    </span>
                                    <span className="flex justify-end gap-2 items-center">
                                      {item?.question}
                                      <FaArrowLeft className="text-xs text-green-500 " />
                                    </span>
                                  </h1>
                                  <h1 className="text-start flex flex-col text-gray-200 my-2">
                                    <span className="text-xs flex my-2 justify-start items-center gap-2 text-purple-500">
                                      <img
                                        src={item?.instructor?.image}
                                        className="w-6 rounded-full h-6"
                                        alt=""
                                      />
                                      {item?.instructor?.name}
                                    </span>
                                    <span className="flex justify-start gap-2 my-2 items-center">
                                      <FaArrowRight className="text-xs text-purple-500 " />
                                      {item?.answer ? (
                                        item?.answer
                                      ) : (
                                        <span className="text-yellow-400">
                                          Pending...
                                        </span>
                                      )}
                                    </span>
                                  </h1>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="input-box gap-0 flex items-center">
                            <BsFillPatchQuestionFill className="text-purple-500 text-xl mx-2 " />

                            <input
                              type="text"
                              placeholder={`${
                                role === "instructor" || role === "admin"
                                  ? "Not Available "
                                  : "Send Your Question"
                              }`}
                              name="question"
                              disabled={
                                role === "instructor" || role === "admin"
                              }
                              className="px-5 w-full outline-dashed outline-purple-500 focus:border-none border-none focus:outline-purple-500 bg-lightCard"
                            />
                            <Button
                              disabled={
                                role === "instructor" || role === "admin"
                              }
                              type="submit"
                              sx={{ color: "#a855f7", outline: "none" }}
                            >
                              <Send />
                            </Button>
                          </div>
                        </form>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
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

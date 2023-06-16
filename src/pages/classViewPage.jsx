import { Footer, NavBar, PrimaryProgress } from "../components";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import classIcon from "../assets/class.svg";
const ClassViewPage = () => {
  const { id } = useParams();
  const { data, loading } = useGetData(`/class/view/students/${id}`);
  console.log(!loading && data?.classes[0]?.newClass?.image);
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <Divider />
      {loading ? (
        <div className="w-full">
          <PrimaryProgress></PrimaryProgress>
        </div>
      ) : (
        <main className="  bg-dark">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full   bg-center bg-cover"
              style={{
                backgroundImage: `url(${
                  !loading && data?.classes[0]?.newClass?.image
                })`,
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
              <div className="relative flex  flex-col  min-w-0 break-words bg-lightCard w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative w-44 overflow-hidden flex justify-center items-center object-cover rounded-full border-4 object-top   border-purple-600 h-44 -mt-20 md:-mt-16">
                        <img
                          alt="..."
                          src={
                            !loading &&
                            data?.classes[0]?.newClass?.instructorIcon
                          }
                          style={{ objectPosition: "top" }}
                          className="shadow-xl  top-0 scale-110 object-fill bg-center align-middle border-none  absolute  h-auto w-full"
                        />
                      </div>
                    </div>
                    <div
                      className="w-full lg:w-4/12 px-4 lg:order-3 my-4 md:my-0  lg:text-right rounded lg:flex  justify-center  items-center lg:self-center"
                      style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="pb-6 px-3 lg:mt-32  sm:mt-0">
                        {" "}
                        <div
                          className={`flex flex-col shadow-xs md:shadow-md "bg-[#1b2640]" home instructor h-fit lg:shadow-lg max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-gray-100`}
                        >
                          <div>
                            <img
                              src={
                                !loading && data?.classes[0]?.newClass?.image
                              }
                              alt=""
                              className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                            />
                            <h2 className="mb-1 text-xl font-semibold">
                              {!loading && data?.classes[0]?.newClass?.name}
                            </h2>
                          </div>
                          <div className="flex z-50 justify-between">
                            <div className="w-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 pt-4 lg:order-1">
                      <div className="flex justify-start flex-wrap  text-gray-200 pb-2 lg:pt-4 "></div>
                      <div className="text-start mb-12">
                        <h3 className="text-4xl font-semibold leading-normal  text-gray-200 mb-2">
                          {!loading && (
                            <>{data?.classes[0]?.newClass?.instructor}</>
                          )}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold ">
                          <span className="flex mx-auto justify-start items-center gap-2">
                            <FaEnvelope className="text-gray-300" />
                            {!loading && (
                              <>{data?.classes[0]?.newClass?.email} </>
                            )}
                          </span>
                        </div>

                        <div className="text-sm leading-normal flex items-center gap-2 mt-0 mb-2 text-purple-500 font-bold uppercase">
                          <FaChalkboardTeacher />
                          Instructor
                        </div>
                        <div className="w-full items-center justify-center flex flex-col">
                          <img
                            src={classIcon}
                            className="w-full md:mt-32"
                            alt=""
                          />
                          <h1 className="mt-4 md:mt-10 text-4xl mx-auto font-semibold  text-center text-purple-500 headline ">
                            Welcome on Board Cheif
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      <h1 className="text-4xl font-semibold  pb-24 text-gray-200">
        See
        <span className="px-2 uppercase text-purple-500">
          {/* {!loading && <>{instructor[0]?.name}</>} */}
        </span>
        Students
      </h1>
      <section className="min-h-screen grid gap-4 py-5 px-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 home w-full bg-[#1b2640"></section>
      <Footer isDarkMode />
    </div>
  );
};

export default ClassViewPage;

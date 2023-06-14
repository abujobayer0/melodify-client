import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { NavBar, Footer } from "../components";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../utils/firebase.init";
import { useGetData } from "../hooks/useGetData";
import {
  FaChalkboardTeacher,
  FaEdit,
  FaEnvelope,
  FaTransgender,
  FaUser,
} from "react-icons/fa";

import { Edit } from "@mui/icons-material";

import { BsTelephoneFill } from "react-icons/bs";
import { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePutData } from "../hooks/usePutData";

const auth = getAuth(app);
const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const localImageRef = useRef();
  const {
    data: student,
    isLoading: loading,
    refetch,
    error,
  } = useGetData(`/user?email=${user?.email}`);
  console.log(error);
  const [imageUploading, setImageUploading] = useState(false);
  const [image, setImage] = useState("");
  const {
    mutate: imageUpdate,
    error: imageError,
    isLoading: imageUploadLoading,
  } = usePutData(`/update/user/profile/image?email=${user?.email}`);
  const uploadImage = async () => {
    setImageUploading(true);
    const localImage = localImageRef.current.files[0];

    if (localImage) {
      try {
        const formData = new FormData();
        formData.append("image", localImage);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGEBB_KEY
          }`,
          { method: "POST", body: formData }
        );

        if (response.ok) {
          const data = await response.json();

          if (data && data.data && data.data.display_url) {
            const imageUrl = data.data.display_url;

            await updateProfile(user, {
              photoURL: imageUrl || null,
            });

            imageUpdate({ image: imageUrl });
            setImageUploading(false);
            refetch();
          } else {
            throw new Error("Failed to upload image or retrieve URL.");
          }
        } else {
          throw new Error("Image upload request failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageUploading(false);
      }
    }
  };

  const {
    data: totalSelected,
    isLoading: selectedLoading,
    error: selectedError,
  } = useGetData(`/user/selectedClass?email=${user?.email}`);
  const {
    data: enrolledCount,
    isLoading: enrolledLoading,
    error: enrolledError,
  } = useGetData(`/payment/history?email=${user.email}`);
  const enrolledTotal = enrolledCount?.count;
  const {
    mutate,
    isLoading,
    error: mutateError,
    data,
    isError,
  } = usePutData(`/update/user?email=${user?.email}`);

  const handleUpdateProfileStudent = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const number = form.number.value;
    const gender = form.gender.value;
    console.log(name, address, number, gender);
    mutate({ name: name, address: address, number: number, gender: gender });
    if (!isError) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-container",
          icon: "custom-swal-icon",
        },
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Profile Update Failed!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-container",
          icon: "custom-swal-icon",
        },
      });
    }
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
                            ? student[0]?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqo3RO1_w9lL_-wI2wmq3EFZroPIq1N_O1Kya335faA&s"
                        }
                        style={{ objectPosition: "top" }}
                        className="shadow-xl  top-0 scale-110 object-fill bg-center align-middle border-none  absolute  h-auto w-full"
                      />{" "}
                      <div className=" items-center   py-2 px-6 absolute -bottom-2 flex justify-center">
                        <div className="input-box ">
                          <div
                            className="flex items-center 
                           px-6 rounded w-full justify-center"
                          >
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer w-full  py-2   shadow-lg"
                            >
                              {" "}
                              <span className="text-lg  flex items-center justify-center gap-2 text-gray-100">
                                {!image ? (
                                  <>
                                    {imageUploading ? (
                                      <span className="flex text-gray-100 gap-4 items-center">
                                        <CircularProgress
                                          sx={{
                                            color: "#9333ea",
                                            width: 2,
                                            height: 2,
                                          }}
                                        />
                                      </span>
                                    ) : (
                                      <FaEdit className="w-full bg-lightCard px-6 rounded home text-xl" />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <FaEdit className="w-full bg-lightCard px-6 rounded home text-xl" />
                                  </>
                                )}
                              </span>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden z-10  w-full"
                                accept="image/*"
                                onChange={uploadImage}
                                ref={localImageRef}
                                name="localImage"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 my-16 px-2 lg:order-3  lg:text-right flex-col rounded lg:flex h-44 overflow-y-auto hidden justify-start  items-start lg:self-center">
                    <h1 className="absolute top-10 text-gray-400">Q&A</h1>
                    <div className="flex flex-col border-2  border-gray-600 px-8 py-4 my-2 rounded-full justify-end items-end">
                      <h1 className="text-xs  text-green-400">
                        Tell me About Your Course
                      </h1>
                      <div className="w-full  text-start  text-purple-400 text-sm ">
                        lorem400
                      </div>
                      <div className="text-start text-gray-300 text-xs">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusantium, placeat?
                      </div>
                    </div>
                    <div className="flex flex-col border-2  border-gray-600 px-8 py-4 my-2 rounded-full justify-end items-end">
                      <h1 className="text-xs  text-green-400">
                        Tell me About Your Course
                      </h1>
                      <div className="w-full  text-start  text-purple-400 text-sm ">
                        lorem400
                      </div>
                      <div className="text-start text-gray-300 text-xs">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusantium, placeat?
                      </div>
                    </div>
                    <div className="flex flex-col border-2  border-gray-600 px-8 py-4 my-2 rounded-full justify-end items-end">
                      <h1 className="text-xs  text-green-400">
                        Tell me About Your Course
                      </h1>
                      <div className="w-full  text-start  text-purple-400 text-sm ">
                        lorem400
                      </div>
                      <div className="text-start text-gray-300 text-xs">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Accusantium, placeat?
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 pt-4 lg:order-1">
                    <div className="flex justify-start flex-wrap  text-gray-200 pb-2 lg:pt-4 ">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                          {(!selectedLoading && totalSelected?.length) || 0}
                        </span>
                        <span className="text-sm text-gray-200">
                          You Selected
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-sm md:text-xl font-bold block uppercase tracking-wide text-gray-300">
                          {!enrolledLoading && enrolledTotal}
                        </span>
                        <span className="text-sm text-gray-200">Enrolled</span>
                      </div>
                    </div>
                    <div className="text-start mb-12">
                      <h3 className="text-4xl font-semibold leading-normal  text-gray-200 mb-2">
                        {!loading && <>{student[0]?.name}</>}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold ">
                        <span className="flex mx-auto justify-start items-center gap-2">
                          <FaEnvelope className="text-gray-300" />
                          {!loading && <>{student[0]?.email} </>}
                        </span>
                      </div>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-300"></i>
                        {!loading && (
                          <>
                            {student[0]?.address
                              ? student[0]?.address
                              : "Unknown"}{" "}
                          </>
                        )}
                      </div>
                      <div className="text-sm leading-normal flex items-center gap-2 mt-0 mb-2 text-green-500 font-bold uppercase">
                        <FaChalkboardTeacher />
                        {!loading && <>{student[0]?.role}</>}
                      </div>
                      <div className="text-sm leading-normal flex items-center gap-2 mt-0 mb-2 text-purple-500 font-bold uppercase">
                        <FaTransgender />

                        {!loading && <>{student[0]?.gender}</>}
                      </div>
                    </div>
                  </div>
                </div>
                <Accordion sx={{ padding: 0 }}>
                  <AccordionSummary
                    expandIcon={
                      <Edit
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
                      {!loading && <>{student[0]?.name}</>}
                      <span className="px-2 text-gray-400">
                        Update Your Profile
                      </span>
                      <span className="text-purple-500 flex items-center gap-2 px-2"></span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "#1b2640",
                      color: "#fff",
                    }}
                  >
                    <div
                      className="w-full py-16 relative  filter "
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)`,
                        backgroundPosition: "top left",
                      }}
                    >
                      <form
                        onSubmit={handleUpdateProfileStudent}
                        className="flex  z-50  py-12 flex-col gap-4"
                      >
                        <div className="flex flex-col gap-4">
                          <div className=" items-center z-50 gap-6 rounded-full  flex px-5">
                            <FaUser className="text-white" />
                            <input
                              type="text"
                              name="name"
                              className="px-5 w-full rounded-full bg-transparent"
                              placeholder="Update your name*"
                              required
                              defaultValue={student ? student[0]?.name : ""}
                            />
                          </div>
                          <div className=" px-5 z-50 flex gap-6 items-center">
                            <i className="fas fa-map-marker-alt  text-lg text-gray-300"></i>

                            <input
                              type="text"
                              placeholder="Update your address*"
                              name="address"
                              className="px-5 bg-transparent rounded-full w-full"
                              defaultValue={student ? student[0]?.address : ""}
                              required
                            />
                          </div>
                          <div className="flex w-full flex-col gap-4 md:gap-. md:flex-row  items-center px-5 z-50 ">
                            <div className="flex gap-6 items-center w-full ">
                              <BsTelephoneFill className="text-gray-100" />
                              <input
                                type="number"
                                name="number"
                                className="px-5 rounded-full w-full bg-transparent"
                                placeholder="Update phone number "
                                defaultValue={
                                  student ? student[0]?.contactNumber : ""
                                }
                              />
                            </div>
                            <div className="w-full flex items-center gap-6   relative ">
                              <label className="font-semibold right-10 top-0 absolute text-[#9ca3af] text-xs  py-1">
                                Update Gender
                              </label>
                              <FaTransgender />
                              <select
                                name="gender"
                                className="text-purple-500 bg-lightCard rounded-full bg-transparent h-[50px] font-semibold  outline-none text-md   block w-full px-6"
                                defaultValue={student ? student[0]?.gender : ""}
                              >
                                <option>male</option>
                                <option value="female">female</option>
                                <option value="custom">custom</option>
                              </select>
                            </div>
                            <div className="bg-purple-600 px-6 py-4 rounded-full">
                              <input type="submit" value="Update " />
                            </div>
                          </div>{" "}
                          {/* {error && <h2 className="text-red-500">{error}</h2>} */}
                        </div>
                      </form>
                    </div>
                  </AccordionDetails>
                </Accordion>
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

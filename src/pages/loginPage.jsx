import { CircularProgress, IconButton } from "@mui/material";
import { NavBar } from "../components";
import "./styles/login.style.css";

import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaLock,
  FaRegImage,
  FaUser,
} from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { useRef, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const auth = getAuth(app);
const LoginPage = () => {
  const location = useLocation();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [user] = useAuthState(auth);
  const [loginError, setLoginError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const localImageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const uploadImage = async () => {
    setImageUploading(true);
    const localImage = localImageRef.current.files[0];
    const formData = new FormData();
    formData.append("image", localImage);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await response.json();

    if (data && data.data && data.data.display_url) {
      setImage(data.data.display_url);
      setImageUploading(false);
    }
  };
  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setLoadingLogin(true);
        fetch(
          `https://melodify-server.onrender.comuserExists?email=${user.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              localStorage.setItem("role", data[0]?.role);
              setLoadingLogin(false);
              navigate(from);
            } else {
              fetch("https://melodify-server.onrender.comusers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: user.displayName,
                  email: user.email,
                  image: user.photoURL,
                  gender: "",
                  contactNumber: user.phoneNumber,
                  address: null,
                  role: "student",
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  localStorage.setItem("role", "student");
                  setLoadingLogin(false);

                  navigate(from);
                });
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoadingLogin(true);

        form.reset();
        fetch(`https://melodify-server.onrender.comuser?email=${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("role", data[0]?.role);
            setLoadingLogin(false);

            navigate(from);
          });
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  const handleRegestration = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const localImage = localImageRef.current.files[0];
    const gender = form.gender.value;
    const contactNumber = form.number.value;
    const address = form.address.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/;
    const role = "student";
    if (password !== confirmPassword) {
      setError("Password and Confirm password is not matching.");
      return;
    }
    if (!localImage) {
      setError("Please select an image .");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password should be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    if (localImage) {
      setLoading(true);
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            if (userCredential) {
              await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: image || null,
              });

              fetch("https://melodify-server.onrender.comusers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  image,
                  gender,
                  contactNumber,
                  address,
                  role,
                }),
              }).then((res) => res.json());

              setLoading(false);
              form.reset();
              fetch(
                `https://melodify-server.onrender.comuser?email=${user?.email}`
              )
                .then((res) => res.json())
                .then((data) => {
                  localStorage.setItem("role", "student");
                  navigate(from);
                });
            }
          })
          .catch((error) => {});
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-dark h-screen overflow-hidden">
      <NavBar isBlack />
      <div className="container  bg-dark">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img
              className="filter brightness-50"
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Unlock Your Musical Potential with <br /> Melodify: Dive into
                the World of Music Learning!
              </span>
              <span className="text-2">Lets get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src="images/backImg.jpg" alt="/" />
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Lets get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content bg-dark">
            <div className="login-form bg-dark">
              <div className="title gap-4 bg-dark flex items-center">
                Login
                {loadingLogin && (
                  <CircularProgress
                    sx={{ color: "#9333ea", width: 2, height: 2 }}
                  />
                )}
              </div>
              <form className="bg-dark " onSubmit={handleLogin}>
                <div className="input-boxes">
                  <div className="input-box bg-[#69547c] px-5">
                    <FaEnvelope className="text-gray-100 " />
                    <input
                      type="email"
                      className="px-5"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="input-box bg-[#69547c] px-5">
                    <FaLock className="text-gray-100" />
                    <input
                      type={`${showPass ? "text" : "password"}`}
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="px-5"
                    />
                    {showPass ? (
                      <FaEye
                        className="w-14 text-white"
                        onClick={handleShowPass}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-14 text-white"
                        onClick={handleShowPass}
                      />
                    )}
                  </div>
                  <div className="text">
                    <a href="#">Forgot password?</a>
                  </div>
                  {loginError && <h2 className="text-red-500">{loginError}</h2>}
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>{" "}
                  <div className="w-full flex flex-col items-center mt-5">
                    <h1 className="font-semibold text-[#9ca3af] text-sm">
                      Social Login
                    </h1>
                    <IconButton
                      onClick={handleGoogleLogin}
                      sx={{ cursor: "pointer" }}
                    >
                      <FaGoogle className="text-gray-100 w-full  text-4xl" />
                    </IconButton>
                  </div>
                  <div className="text sign-up-text">
                    Dont have an account?{" "}
                    <label htmlFor="flip">Signup now</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title flex gap-4">
                Signup
                {loading && (
                  <CircularProgress
                    sx={{ color: "#9333ea", width: 2, height: 2 }}
                  />
                )}
              </div>
              <form className="bg-dark" onSubmit={handleRegestration}>
                <div className="input-boxes">
                  <div className="input-box bg-[#69547c] px-5">
                    <FaUser className="text-gray-100" />
                    <input
                      type="text"
                      name="name"
                      className="px-5"
                      placeholder="Enter your name*"
                      required
                    />
                  </div>
                  <div className="input-box bg-[#69547c] px-5">
                    <FaEnvelope className="text-gray-100" />

                    <input
                      type="email"
                      placeholder="Enter your email*"
                      name="email"
                      className="px-5"
                      required
                    />
                  </div>
                  <div className="input-box bg-[#69547c] px-5">
                    <FaLock className="text-gray-100" />
                    <input
                      type={`${showPass ? "text" : "password"}`}
                      placeholder="Enter your password*"
                      required
                      className="px-5"
                      name="password"
                    />{" "}
                    {showPass ? (
                      <FaEye
                        className="w-14 text-gray-100"
                        onClick={handleShowPass}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-14 text-gray-100"
                        onClick={handleShowPass}
                      />
                    )}
                  </div>
                  <div className="input-box bg-[#69547c] px-5">
                    <FaLock className="text-gray-100" />
                    <input
                      type={`${showPass ? "text" : "password"}`}
                      placeholder="Confirm password*"
                      required
                      className="px-5"
                      name="confirmPassword"
                    />{" "}
                    {showPass ? (
                      <FaEye
                        className="w-14 text-gray-100"
                        onClick={handleShowPass}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-14 text-gray-100"
                        onClick={handleShowPass}
                      />
                    )}
                  </div>
                  <div className=" items-center flex justify-center">
                    <div className="input-box ">
                      <div className="flex items-center bg-[#69547c] w-full justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer w-full  py-2   shadow-lg"
                        >
                          <span className="text-lg flex items-center justify-center gap-2 text-gray-100">
                            <FaRegImage />
                            {!image ? (
                              <>
                                {imageUploading ? (
                                  <span className="flex text-gray-100 gap-4 items-center">
                                    Uploading{" "}
                                    <CircularProgress
                                      sx={{
                                        color: "#9333ea",
                                        width: 2,
                                        height: 2,
                                      }}
                                    />
                                  </span>
                                ) : (
                                  "Uplaod image*"
                                )}
                              </>
                            ) : (
                              <>
                                <span className="flex items-center">
                                  Image loaded
                                </span>
                              </>
                            )}
                          </span>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden  w-full"
                            accept="image/*"
                            onChange={uploadImage}
                            ref={localImageRef}
                            name="localImage"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center  gap-4">
                    <div className="input-box bg-[#69547c] px-5">
                      <BsTelephoneFill className="text-gray-100" />
                      <input
                        type="number"
                        name="number"
                        className="px-5"
                        placeholder="Phone number (optional)"
                      />
                    </div>
                    <div className="w-full relative ">
                      <label className="font-semibold right-10 top-0 absolute text-[#9ca3af] text-xs  py-1">
                        Gender
                      </label>

                      <select
                        name="gender"
                        className="text-[#9ca3af] h-[50px] font-semibold  outline-none text-md focus:ring-[#ff7703] bg-[#69547c] block w-full p-2.5"
                      >
                        <option defaultValue>male</option>
                        <option value="female">female</option>
                        <option value="custom">custom</option>
                      </select>
                    </div>
                  </div>{" "}
                  <div className="input-box bg-[#69547c] px-5">
                    <FaAddressCard className="text-gray-100" />
                    <input
                      type="text"
                      name="address"
                      className="px-5"
                      placeholder="Type your address (optional)"
                    />
                  </div>
                  {error && <h2 className="text-red-500">{error}</h2>}
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account?{" "}
                    <label htmlFor="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { Divider } from "@mui/material";
import {
  Banner,
  Footer,
  Instructors,
  NavBar,
  Instruments,
  PopularClasses,
} from "../components";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

// import { Banner, NavBar } from "./";
const auth = getAuth(app);
const Home = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user?.displayName) {
      fetch(`https://melodify-server.onrender.com/user?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("role", data[0]?.role);
        });
    }
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  console.log(isDarkMode);
  return (
    <div className={`relative ${isDarkMode ? "bg-dark  " : "bg-white"} `}>
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Divider />
      <Banner />
      <PopularClasses isDarkMode={isDarkMode} />
      <Instructors isDarkMode={isDarkMode} />
      <div>
          <section className="dark:bg-dark home dark:text-gray-100">
          <div className="container px-6 py-12 mx-auto">
            <div className="grid items-center gap-4 xl:grid-cols-5">
              <div className="max-w-2xl mx-auto my-8 space-y-4 text-center  xl:col-span-2 xl:text-left">
                <h2 className="text-4xl text-gray-300 font-bold">
                  Successfull Students Testomonials
                </h2>
                <p className="text-gray-400">
                  Unlock your musical potential with Melodify. Join successful
                  students who have mastered instruments, composition, and
                  performance. Start your musical journey today
                </p>
              </div>
              <div className="p-6 xl:col-span-3">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid content-center gap-4">
                    <div className="p-6 rounded text-gray-300 shadow-md bg-[#1b2640]">
                      <p>
                        Melodify transformed my musical journey. Expert
                        guidance, interactive lessons, and a supportive
                        community propelled me to new heights. Grateful to be
                        part of this exceptional platform.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?1"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            Student of Melodify.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded text-gray-300 shadow-md bg-[#1b2640]">
                      <p>
                        Melodify exceeded my expectations as a music learning
                        platform. The expert guidance and interactive lessons
                        helped me unlock my full potential. The supportive
                        community and personalized approach made my musical
                        journey truly remarkable. Thank you, Melodify, for
                        empowering me to reach new heights in my music!
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?2"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            Student of Melodify.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid content-center gap-4">
                    <div className="p-6 rounded  text-gray-300 shadow-md bg-[#1b2640]">
                      <p>
                        Melodify has been a game-changer for my musical growth.
                        The guidance and interactive lessons have propelled me
                        forward. The supportive community and personalized
                        approach make learning music a joy. Grateful to be a
                        part of Melodify's transformative journey!
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?3"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm text-gray-400">
                            Student of Melodify.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded text-gray-300  shadow-md bg-[#1b2640]">
                      <p>
                        Melodify has been a catalyst for my musical progress.
                        With engaging lessons and a supportive community, I've
                        surpassed my own expectations. Thank you, Melodify, for
                        making my musical journey unforgettable!
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?4"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm text-gray-400">
                            Student of Melodify.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;

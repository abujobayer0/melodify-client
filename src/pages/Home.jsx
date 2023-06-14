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
      fetch(`https://melodify-server.onrender.comuser?email=${user?.email}`)
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
        <Instruments isDarkMode={isDarkMode} />
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;

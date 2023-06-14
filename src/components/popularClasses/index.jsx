import PrimaryProgress from "../progress";
import PopularClassCard from "../popularClassCard";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../../utils/firebase.init";
import Swal from "sweetalert2";
import axios from "axios";
import { useGetData } from "../../hooks/useGetData";
const auth = getAuth(app);
const PopularClasses = ({ isDarkMode }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetData("/popular/classes");

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
  console.log(data, "query");
  return (
    <section
      className={`py-6 home ${
        isDarkMode ? "bg-dark text-gray-100" : "bg-white text-black"
      } bg-transparent `}
    >
      <div
        className={`p-4 mx-auto ${
          isDarkMode ? "bg-dark" : "bg-white"
        } py-16 sm:p-10`}
      >
        <div className={`space-y-4 ${isDarkMode ? "bg-dark" : "bg-white"}`}>
          <h3
            className={`text-2xl ${
              isDarkMode ? "bg-dark text-gray-100" : "bg-white text-purple-500"
            } font-bold leading-none sm:text-5xl`}
          >
            Our Popular Classes
          </h3>
          <p
            className={`max-w-3xl mx-auto ${
              isDarkMode ? "bg-dark text-gray-400" : "bg-white text-gray-800"
            } `}
          >
            Discover a Harmonious Haven of Musical Education: Immerse Yourself
            in an Extraordinary Collection of Exquisite Courses Curated by
            World-Renowned Instructors, Unleashing the Power of Your Artistic
            Potential
          </p>
        </div>
        <div
          className={`grid w-full mt-10 ${
            isDarkMode ? "bg-dark" : "bg-white"
          } grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {isDarkMode ? (
            <>
              {data?.map((item, indx) => (
                <PopularClassCard
                  handleSelect={handleSelect}
                  item={item}
                  key={indx}
                />
              ))}
            </>
          ) : (
            <>
              {data?.map((item, indx) => (
                <PopularClassCard
                  handleSelect={handleSelect}
                  item={item}
                  key={indx}
                  dark
                />
              ))}
            </>
          )}
        </div>
        {isLoading && <PrimaryProgress />}
      </div>
    </section>
  );
};

export default PopularClasses;

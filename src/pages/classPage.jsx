import { useEffect } from "react";
import { ClassCard, NavBar, Footer, PrimaryProgress } from "../components";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetData } from "../hooks/useGetData";

const auth = getAuth(app);
const ClassPage = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const { data, isLoading, error } = useGetData("/classes");

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

  return (
    <div className="bg-dark home ">
      <NavBar isBlack />
      <div className="my-10  md:my-16 ">
        <h3 className="text-2xl font-bold leading-none text-gray-100 sm:text-5xl">
          See our Classes
        </h3>
        <p className="max-w-2xl  pt-4 px-5 mx-auto text-gray-400">
          Explore the Finest Pop Music Classes: Unlock Your Musical Potential
          with Expert Guidance!
        </p>
      </div>
      <div className="grid  bg-dark grid-cols-1  gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((classItem, indx) => (
          <ClassCard
            key={indx}
            handleSelect={handleSelect}
            classItem={classItem}
          />
        ))}
      </div>
      {isLoading && <PrimaryProgress />}

      <Footer isDarkMode />
    </div>
  );
};

export default ClassPage;

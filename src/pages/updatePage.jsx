import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";

import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Footer, NavBar } from "../components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const auth = getAuth(app);
const UpdatePage = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [classItem, setClassItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://melodify-server.onrender.com/all/classes/${id}`)
      .then((res) => res.json())
      .then((data) => setClassItem(data[0]));
  }, []);

  const handleClassUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { detail, seat, price } = form;
    const updatedClass = {
      available_seat: parseInt(seat.value),
      price: parseInt(price.value),
      detail: detail.value || "",
    };
    try {
      setLoading(true);

      fetch(`https://melodify-server.onrender.com/classes/update?id=${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedClass),
      })
        .then((res) => res.json())
        .then((data) => setClassItem(data[0]))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          navigate("/dashboard");
        });
    } catch (error) {
      // Handle error
    }
  };
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <div className="max-w-full p-8 mx-5 my-10 rounded-md md:mx-10 sm:flex border-gray-400 border-2 sm:space-x-6 bg-dark dark:bg-gray-900 text-gray-100">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src={classItem?.newClass?.image}
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl  text-start text-gray-100 font-semibold">
              {classItem?.newClass?.name}
            </h2>
            <span className="text-sm flex w-full justify-start text-gray-400">
              {classItem?.newClass?.detail}
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="text-gray-400">
                {classItem?.newClass?.email}
              </span>
            </span>
            <span className="flex items-center text-gray-400 space-x-2">
              Available Seat {classItem?.newClass?.available_seat}
            </span>
            <span className="flex items-center text-gray-400 space-x-2">
              Price {classItem?.newClass?.price}
            </span>
          </div>
        </div>
      </div>
      <form className="w-full bg-dark p-4" onSubmit={handleClassUpdate}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {" "}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold leading-none text-white sm:text-5xl">
              Update Your Class
            </h3>
            <p className="max-w-2xl dark:text-gray-400"></p>
          </div>
          <Box
            sx={{
              width: "100%",
              display: "flex",

              gap: 2,
            }}
          >
            <TextField
              fullWidth
              required
              type="number"
              name="seat"
              label="Update available Seat"
              InputProps={{
                style: {
                  color: "#fff", // Set the text color
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8C4FFC", // Set the border color
                    color: "#fff", // Set the text color
                  },
                  "&:hover fieldset": {
                    borderColor: "#8C4FFC", // Set the border color on hover
                    color: "#fff", // Set the text color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8C4FFC", // Set the border color when focused
                    color: "#fff", // Set the text color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#f3f4f6", // Set the label color
                },
                background: "#69547c",
                color: "#fff", // Set the text color
              }}
            />

            <TextField
              fullWidth
              name="price"
              required
              type="number"
              label="Update price"
              InputProps={{
                style: {
                  color: "#fff", // Set the text color
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8C4FFC", // Set the border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#8C4FFC", // Set the border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8C4FFC", // Set the border color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#f3f4f6", // Set the label color
                },
                background: "#69547c",
              }}
            />
          </Box>
          <TextField
            fullWidth
            name="detail"
            type="text"
            label="Update class detail"
            InputProps={{
              style: {
                color: "#fff", // Set the text color
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#8C4FFC", // Set the border color
                },
                "&:hover fieldset": {
                  borderColor: "#8C4FFC", // Set the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8C4FFC", // Set the border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "#f3f4f6", // Set the label color
              },
              background: "#69547c",
            }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#9333ea",
              "&&:hover": {
                backgroundColor: "#9333ea",
              },
            }}
            variant="contained"
          >
            Update your Class
          </Button>
          <div className="w-full flex justify-center items-center">
            {loading && <CircularProgress />}
          </div>
        </Box>
      </form>
      <Footer isDarkMode />
    </div>
  );
};

export default UpdatePage;

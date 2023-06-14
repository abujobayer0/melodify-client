import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../../utils/firebase.init";
import Swal from "sweetalert2";
import axios from "axios";
const auth = getAuth(app);
const ClassAdd = () => {
  const [user] = useAuthState(auth);
  const imageRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const imageUpload = (e) => {
    setLoading(true);
    return fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
      { method: "POST", body: e }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.display_url) {
          setLoading(false);
          return data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      });
  };
  const handleClassAdd = async (event) => {
    event.preventDefault();
    const form = event.target;
    const localImage = imageRef.current.files[0];
    const { name, instructor, email, detail, seat, price } = form;

    const formData = new FormData();
    formData.append("image", localImage);

    try {
      setLoading(true);
      let uploadedImageUrl = "";

      if (localImage) {
        uploadedImageUrl = await imageUpload(formData);
      } else {
        throw new Error("Please choose a class thumbnail image!");
      }
      const icon = await user?.photoURL;
      const newClass = {
        image: uploadedImageUrl,
        name: name.value,
        instructor: instructor.value,
        available_seat: parseInt(seat.value),
        price: parseInt(price.value),
        email: email.value,
        detail: detail.value || "",
        status: "pending",
        instructorIcon: icon,
      };

      try {
        const response = await axios.post(
          "https://melodify-server.onrender.com/class",
          { newClass },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Add Successfully!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "custom-swal-container",
              icon: "custom-swal-icon",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }

      form.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="w-full bg-dark py-4 md:py-0 md:p-4"
      onSubmit={handleClassAdd}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#1b2640",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
        {" "}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-100 leading-none sm:text-5xl">
            Add a class
          </h3>
          <p className="max-w-2xltext-gray-400"></p>
        </div>
        <TextField
          fullWidth
          label="Class Name"
          name="name"
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
              color: "#8C4FFC", // Set the label color
            },
          }}
          required
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",

            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Instructor Email"
            name="instructor"
            value={user?.displayName}
            InputProps={{
              readOnly: true,

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
                color: "#8C4FFC", // Set the label color
              },
            }}
          />

          <TextField
            fullWidth
            label="Instructor Name"
            value={user?.email}
            name="email"
            InputProps={{
              readOnly: true,

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
                color: "#8C4FFC", // Set the label color
              },
            }}
          />
        </Box>
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
            label="Available Seat"
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
                color: "#8C4FFC", // Set the label color
              },
            }}
          />
          <TextField
            fullWidth
            name="price"
            required
            type="number"
            label="Price"
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
                color: "#8C4FFC", // Set the label color
              },
            }}
          />
        </Box>
        <TextField
          fullWidth
          name="detail"
          type="text"
          label="Class detail"
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
              color: "#8C4FFC", // Set the label color
            },
          }}
        />
        <div className="flex  border-gray-700 border-2 rounded items-center bg-purple-300  w-full justify-center">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer  w-full  py-2 px-4 rounded-lg shadow-lg"
          >
            <span className="text-lg flex items-center justify-center  gap-2 text-gray-700">
              <FaRegImage />
              {isImage ? "image ready for upload" : "Upload Image*"}
            </span>
            <input
              id="file-upload"
              type="file"
              ref={imageRef}
              onChange={() => setIsImage(true)}
              className="hidden w-full"
              accept="image/*"
              name="localImage"
            />
          </label>
        </div>
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
          Add Your Class
        </Button>
        <div className="w-full flex justify-center items-center">
          {loading && <CircularProgress />}
          {error && <span className="text-red-600"> {error}</span>}
        </div>
      </Box>
    </form>
  );
};

export default ClassAdd;

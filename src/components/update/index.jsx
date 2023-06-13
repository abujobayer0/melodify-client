import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../utils/firebase.init";
const auth = getAuth(app);
const Update = () => {
  const [user] = useAuthState(auth);
  const imageRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClassAdd = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { name, instructor, email, detail, seat, price } = form;
    const updatedClass = {
      available_seat: parseInt(seat.value),
      price: parseInt(price.value),
      detail: detail.value || "",
    };
  };

  return (
    <form className="w-full bg-dark p-4" onSubmit={handleClassAdd}>
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
          <h3 className="text-2xl font-bold leading-none sm:text-5xl">
            Add a class
          </h3>
          <p className="max-w-2xl dark:text-gray-400"></p>
        </div>
        <TextField fullWidth label="Class Name" name="name" required />
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
            sx={{ outline: "none" }}
          />
          <TextField
            fullWidth
            name="price"
            required
            type="number"
            label="Price"
            sx={{ outline: "none" }}
          />
        </Box>
        <TextField
          fullWidth
          name="detail"
          type="text"
          label="Class detail"
          sx={{ outline: "none" }}
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

export default Update;

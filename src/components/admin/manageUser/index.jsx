import { useEffect, useRef, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Check, Feedback } from "@mui/icons-material";

import { TbBan } from "react-icons/tb";
import { useGetData } from "../../../hooks/useGetData";

const ManageUsers = () => {
  const [Modalopen, setOpen] = useState(false);
  const [fetchdata, setFetch] = useState(true);
  const [feedback, setFeedBack] = useState("");
  const [id, setId] = useState("");
  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const [classes, setClasses] = useState([]);

  // useEffect(() => {
  //   fetch(`https://melodify-server.onrender.com/all/classes`)
  //     .then((res) => res.json())
  //     .then((data) => setClasses(data));
  // }, [fetchdata]);
  const { data, loading, refetch } = useGetData(`/all/classes`);
  const classes = !loading && data;
  const handleApprove = (id) => {
    fetch(`https://melodify-server.onrender.com/classes/status?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }), // Include status in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch((prev) => !prev);
      });
  };

  const handleDenied = (id) => {
    fetch(`https://melodify-server.onrender.com/classes/status?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: "denied" }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        setFetch((prev) => !prev);
      });
  };

  const handleSendFeedback = () => {
    fetch(`https://melodify-server.onrender.com/classes/feedback?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ feedback: feedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch((prev) => !prev);
        refetch();
        setOpen(false);
      });
  };
  return (
    <div
      className="w-full h-screen overflow-y-auto  my-4 md:my-0 md:px-4"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#8C4FFC #000" }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{
            backgroundColor: "#1b2640",
            minHeight: classes?.length === 0 && "100vh",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Instructor Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Available seats</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes?.map((classItem, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="w-14 rounded-md"
                    src={classItem.newClass.image}
                    alt=""
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.newClass.name.length > 20
                    ? classItem.newClass.name.slice(0, 20) + "..."
                    : classItem.newClass.name}
                </TableCell>
                <TableCell>
                  <Chip
                    label={classItem.newClass.status}
                    color={
                      classItem.newClass.status === "approved"
                        ? "success"
                        : classItem.newClass.status === "pending"
                        ? "warning"
                        : classItem.newClass.status === "denied"
                        ? "error"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem?.newClass?.name}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem?.newClass?.email}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem?.newClass?.available_seat}
                </TableCell>
                <TableCell
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Button
                    variant="contained"
                    disabled={
                      classItem.newClass.status === "denied" ||
                      classItem.newClass.status === "approved"
                    }
                    onClick={() => handleDenied(classItem._id)}
                    color="error"
                    sx={{ color: "#fff" }}
                  >
                    <TbBan />
                    Denied
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3ca341",
                      "&&:hover": {
                        backgroundColor: "#3ca341",
                      },
                    }}
                    onClick={() => handleApprove(classItem._id)}
                    disabled={
                      classItem.newClass.status === "denied" ||
                      classItem.newClass.status === "approved"
                    }
                  >
                    <Check /> Approve
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleClickOpen(classItem._id)}
                    sx={{ color: "#fff" }}
                  >
                    <Feedback />
                    send Feedback
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Dialog
            open={Modalopen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              sx={{ backgroundColor: "#1b2640", color: "#fff", p: 4 }}
              id="alert-dialog-title"
            >
              Write a Feedback for approve/denied reason
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1b2640" }}>
              <form>
                <TextField
                  fullWidth
                  name="feedback"
                  type="text"
                  onChange={(e) => setFeedBack(e.target.value)}
                  required
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
              </form>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1b2640", p: 4 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                autoFocus
                color="error"
              >
                cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSendFeedback}
                variant="contained"
                color="success"
              >
                Send feedback
              </Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUsers;

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../utils/firebase.init";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useGetData } from "../../hooks/useGetData";
import PrimaryProgress from "../progress";
const auth = getAuth(app);

const OwnClass = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [feedback, setFeedback] = useState("");
  const handleClickOpen = (e) => {
    setFeedback(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [user] = useAuthState(auth);
  const { data, isLoading, error } = useGetData(
    `/instructor/classes?email=${user?.email}`
  );
  console.log(error);
  return (
    <div className="w-full  py-4  md:py-0 md:px-4">
      <TableContainer
        sx={{
          backgroundColor: "#1b2640",
          minHeight: data?.length === 0 && "100vh",

          borderRadius: "10px",
        }}
        component={Paper}
      >
        <Table sx={{ backgroundColor: "#1b2640", borderRadius: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>
                Total Enrolled Students
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>Feedback</TableCell>
              <TableCell sx={{ color: "#fff" }}>View</TableCell>
              <TableCell sx={{ color: "#fff" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((classItem, index) => (
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
                  {classItem.newClass?.enroll?.length || 0}
                </TableCell>
                <TableCell>
                  {classItem.newClass.feedback ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleClickOpen(classItem.newClass.feedback)
                      }
                      sx={{ color: "#fff", width: "150px" }}
                    >
                      <FaEye />
                      admin feedback
                    </Button>
                  ) : (
                    <span className="text-white ">No feedback</span>
                  )}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.newClass.status === "approved" && (
                    <Link to={`/class/${classItem?._id}`}>
                      <Button
                        sx={{
                          width: "150px",
                          backgroundColor: "#a855f7",
                          color: "#fff",
                        }}
                      >
                        <FaEye /> View Class
                      </Button>
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    disabled={classItem.newClass.status !== "pending"}
                    variant="contained"
                    sx={{
                      backgroundColor: "#9333ea",
                      "&&:hover": {
                        backgroundColor: "#9333ea",
                      },
                    }}
                  >
                    <Link className="flex" to={`/updateClass/${classItem._id}`}>
                      <Edit /> Update
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {isLoading && <PrimaryProgress />}
          </TableBody>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ backgroundColor: "#1b2640", color: "#fff", p: 4 }}
            >
              Admin Feedback
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1b2640" }}>
              <DialogContentText
                sx={{ color: "#fff" }}
                id="alert-dialog-description"
              >
                {feedback}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1b2640", p: 4 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="success"
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OwnClass;

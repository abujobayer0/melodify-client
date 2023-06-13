import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../utils/firebase.init";
import {
  Button,
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
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const SelectedClasses = () => {
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const [fetchStatus, setFetch] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedClasses, setSelectedClasses] = useState([]);
  console.log(selectedClasses);
  useEffect(() => {
    fetch(
      `https://melodify-server.onrender.com/user/selectedClass?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setSelectedClasses(data));
  }, [fetchStatus]);
  const deleteSelected = (id) => {
    fetch(`https://melodify-server.onrender.com/user/selectedClass/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch((prev) => !prev);
      });
  };
  return (
    <div className="w-full  py-4  md:py-0 md:px-4">
      <TableContainer
        sx={{
          backgroundColor: "#1b2640",
          minHeight: selectedClasses.length === 0 && "100vh",
          borderRadius: "10px",
        }}
        component={Paper}
      >
        <Table sx={{ backgroundColor: "#1b2640", borderRadius: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>email</TableCell>

              <TableCell sx={{ color: "#fff" }}>Enroll</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selectedClasses.map((classItem, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="w-14 rounded-md"
                    src={classItem.selectedClass.newClass.image}
                    alt=""
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.selectedClass.newClass.name.length > 20
                    ? classItem.selectedClass.newClass.name.slice(0, 20) + "..."
                    : classItem.selectedClass.newClass.name}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {classItem.selectedClass.newClass.email}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <Link to={`/class/enroll/payment/${classItem._id}`}>
                    <Button
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center ",
                        background: "#ac8fcb",
                        color: "white",
                        "&&:hover": {
                          background: "#ac8fcb",
                        },
                      }}
                    >
                      {" "}
                      <BsTrash />
                      Pay
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center ",
                      background: "#f87171",
                      color: "white",
                      "&&:hover": {
                        background: "red",
                      },
                    }}
                    onClick={() => deleteSelected(classItem._id)}
                  >
                    {" "}
                    <BsTrash />
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SelectedClasses;

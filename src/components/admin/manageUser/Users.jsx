import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { FaUser } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [fetchdata, setFetch] = useState(true);

  useEffect(() => {
    fetch(`https://melodify-server.onrender.com/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [fetchdata]);
  const handleAdmin = (id) => {
    fetch(`https://melodify-server.onrender.com/users/role?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ role: "admin" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch((prev) => !prev);
      });
  };

  const handleInstructor = (id) => {
    fetch(`https://melodify-server.onrender.com/users/role?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ role: "instructor" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFetch((prev) => !prev);
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
            minHeight: users.length === 0 && "100vh",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>User Icon</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>

              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img className="w-14 rounded-md" src={user.image} alt="" />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={
                      user.role === "admin"
                        ? "success"
                        : user.role === "instructor"
                        ? "secondary"
                        : user.role === "student"
                        ? "error"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>

                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={
                      user.role === "admin" || user.role === "instructor"
                    }
                    onClick={() => handleInstructor(user._id)}
                    color="secondary"
                    sx={{ color: "#fff" }}
                  >
                    <FaUser className="mx-2" />
                    Instructor
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3ca341",
                      "&&:hover": {
                        backgroundColor: "#3ca341",
                      },
                    }}
                    onClick={() => handleAdmin(user._id)}
                    disabled={user.role === "admin"}
                  >
                    <FaUser className="mx-2" />
                    Admin
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

export default Users;

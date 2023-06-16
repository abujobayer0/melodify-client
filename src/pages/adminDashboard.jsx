import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Chart, Footer, ManageUsers, NavBar, Users } from "../components";
import {
  FaBookmark,
  FaChartPie,
  FaFlipboard,
  FaPlus,
  FaUserAstronaut,
} from "react-icons/fa";

import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
const auth = getAuth(app);
const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [index, setIndex] = useState(0);
  // const [classCount, setClassCount] = useState(0);
  // const [userCount, setUserCount] = useState(0);
  // const [instructorCount, setInstructorCount] = useState(0);
  const { data, loading } = useGetData(
    "/admin/classes/instructors/users/count"
  );
  // useEffect(() => {
  //   fetch(
  //     "https://melodify-server.onrender.com/admin/classes/instructors/users/count"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setClassCount(data.classCount);
  //       setUserCount(data.userCount);
  //       setInstructorCount(data.instructorCount);
  //     });
  // }, [index]);
  const classCount = !loading && data?.classCount;
  const instructorCount = !loading && data?.instructorCount;
  const userCount = !loading && data?.userCount;
  return (
    <div className="bg-dark">
      <NavBar isBlack />
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          mt: 2,
          px: 2,
        }}
      >
        <List
          sx={{
            height: { xs: "fit-content", sm: "100vh" },
            width: { xs: "100%", sm: "300px" },
            backgroundColor: "#1b2640",
            padding: " 10px",
            flexWrap: "wrap",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            alignItems: "center",
            gap: { xs: 2, sm: 2 },
            py: 4,
            borderRadius: "10px",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setIndex(0)}
              sx={{
                backgroundColor: index == 0 ? "#ac8fcb" : "#fff",
                borderRadius: "20px",
                "&&:hover": {
                  backgroundColor: "#d8b4fe",
                },
              }}
            >
              <ListItemIcon>
                <FaChartPie />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setIndex(1)}
              sx={{
                backgroundColor: index == 1 ? "#ac8fcb" : "#fff",
                borderRadius: "20px",
                "&&:hover": {
                  backgroundColor: "#d8b4fe",
                },
              }}
            >
              <ListItemIcon>
                <FaFlipboard />
              </ListItemIcon>
              <ListItemText primary={"Manage Classes"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setIndex(2)}
              sx={{
                backgroundColor: index == 2 ? "#d8b4fe" : "#fff",

                borderRadius: "20px",
                "&&:hover": {
                  backgroundColor: "#d8b4fe",
                },
              }}
            >
              <ListItemIcon>
                <FaUserAstronaut />
              </ListItemIcon>
              <ListItemText primary={"Manage Users"} />
            </ListItemButton>
          </ListItem>
        </List>
        {index == 0 ? (
          <div className="flex flex-col w-full md:mx-4 rounded-lg my-4 md:my-0 md:px-4 bg-[#1b2640]">
            <Chart />
            <div className="w-full p-4">
              <div className="w-full bg-[#1b2640]   rounded-xl">
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="w-full bg-blue-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      {classCount}
                    </span>
                    Total Classes{" "}
                  </div>
                  <div className="w-full bg-red-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      {userCount}
                    </span>
                    total users
                  </div>

                  <div className="w-full bg-purple-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      {instructorCount}
                    </span>
                    Total Instructors{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : index === 1 ? (
          <ManageUsers />
        ) : index === 2 ? (
          <div className="w-full">
            <Users />
          </div>
        ) : (
          ""
        )}
      </Box>
      <Footer isDarkMode />
    </div>
  );
};

export default AdminDashboard;

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  BubbleChart,
  ChatBox,
  ClassAdd,
  Footer,
  NavBar,
  OwnClass,
} from "../components";
import {
  FaChartPie,
  FaGuitar,
  FaPlus,
  FaUser,
  FaUserAstronaut,
} from "react-icons/fa";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Chat } from "@mui/icons-material";
const auth = getAuth(app);
const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const [classCount, setClassCount] = useState([]);
  const [enrollCount, setEnrollCount] = useState([]);
  useEffect(() => {
    fetch(
      `https://melodify-server.onrender.com/instructor/classes?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setClassCount(data));
  }, [index]);
  useEffect(() => {
    fetch(
      `https://melodify-server.onrender.com/enroll/totalLength?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setEnrollCount(data));
  }, [index]);

  const activeCount = classCount.reduce((count, item) => {
    if (item.newClass.status === "approved") {
      count++;
    }
    return count;
  }, 0);
  const [user] = useAuthState(auth);
  return (
    <div className="w-full bg-dark">
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
                <FaPlus />
              </ListItemIcon>
              <ListItemText primary={"Add a class"} />
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
              <ListItemText primary={"My Classes"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setIndex(3)}
              sx={{
                backgroundColor: index == 3 ? "#d8b4fe" : "#fff",

                borderRadius: "20px",
                "&&:hover": {
                  backgroundColor: "#d8b4fe",
                },
              }}
            >
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText primary={"Chats"} />
            </ListItemButton>
          </ListItem>
        </List>
        {index == 0 ? (
          <div className="flex flex-col justify-start items-center gap-10">
            <BubbleChart />

            <div className="w-full py-4 md:py-0 md:px-4">
              <div className="w-full bg-[#1b2640]   rounded-xl">
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="w-full bg-blue-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      <FaGuitar /> {classCount.length}
                    </span>
                    Total Class
                  </div>
                  <div className="w-full bg-red-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      <FaGuitar />
                      {activeCount}
                    </span>
                    Total Approved Class
                  </div>
                  <div className="w-full bg-purple-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      <FaUser />
                      {enrollCount.totalLength}
                    </span>
                    Total Enrolled Student
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : index === 1 ? (
          <ClassAdd user={user} />
        ) : index === 2 ? (
          <OwnClass />
        ) : index === 3 ? (
          <ChatBox />
        ) : (
          ""
        )}
      </Box>
      <Footer isDarkMode />
    </div>
  );
};

export default Dashboard;

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
  Enrolled,
  Footer,
  NavBar,
  PaymentHistory,
  SelectedClasses,
  StackedChart,
} from "../components";
import { FaChartPie, FaGuitar, FaHistory, FaMoneyBill } from "react-icons/fa";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const StudentDashboard = () => {
  const [user] = useAuthState(auth);
  const [index, setIndex] = useState(0);
  const [selectedClassCount, setSelectedClassCount] = useState(0);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [totalEnrolledCount, setTotalEnrolledCount] = useState(0);
  useEffect(() => {
    fetch(
      `https://melodify-server.onrender.com/selectedClass/count?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setSelectedClassCount(data.count));
  }, [index]);
  useEffect(() => {
    fetch(
      `https://melodify-server.onrender.com/payment/history?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalEnrolledCount(data.count);
        setEnrolledClasses(data.result);
      });
  }, [index]);
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
                <FaGuitar />
              </ListItemIcon>
              <ListItemText primary={"My Selected Classes"} />
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
                <FaMoneyBill />
              </ListItemIcon>
              <ListItemText primary={"My Enrolled Classes"} />
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
                <FaHistory />
              </ListItemIcon>
              <ListItemText primary={"Payment History"} />
            </ListItemButton>
          </ListItem>
        </List>
        {index == 0 ? (
          <div className="flex flex-col w-full md:mx-4 rounded-lg my-4 md:my-0 md:px-4 bg-[#1b2640]">
            <StackedChart />
            <div className="w-full p-4">
              <div className="w-full bg-[#1b2640]   rounded-xl">
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="w-full bg-blue-400 h-48 flex flex-col justify-end items-start p-4 text-xl uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      {selectedClassCount}
                    </span>
                    Total Selected Classes{" "}
                  </div>
                  <div className="w-full bg-red-400 h-48 flex flex-col justify-end items-start p-4 text-lg uppercase text-gray-200 gap-10 rounded-lg">
                    <span className="flex w-full items-start gap-2 text-7xl justify-start mt-2">
                      {totalEnrolledCount}
                    </span>
                    total Enrolled Classes
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : index === 1 ? (
          <SelectedClasses />
        ) : index === 2 ? (
          <Enrolled items={enrolledClasses} />
        ) : (
          <PaymentHistory items={enrolledClasses} />
        )}
      </Box>
      <Footer isDarkMode />
    </div>
  );
};

export default StudentDashboard;

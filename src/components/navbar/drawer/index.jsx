import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Logo from "../../logo";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { IconButton } from "@mui/material";
import { Dashboard, Home, Login, Logout } from "@mui/icons-material";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../../utils/firebase.init";
import { getAuth, signOut } from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";
import ThemeSwitcher from "../../ThemeSwitcher";

const auth = getAuth(app);
export default function TemporaryDrawer({ toggleTheme, isDarkMode }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("role");
        navigate(location.state.from || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#111827",
        height: "100vh",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ bgcolor: "#111827" }}>
        <ListItem>
          <ListItemButton>
            <Logo isBlack />
          </ListItemButton>
        </ListItem>
        <Divider />
        <NavLink to={"/"}>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "#4b5563" }}>
              <ListItemIcon>
                <Home sx={{ color: "#a855f7" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to={"/instractor"}>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "#4b5563" }}>
              <ListItemIcon>
                <GiTeacher className="text-purple-500" />
              </ListItemIcon>
              <ListItemText primary={"Instractors"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to={"/classes"}>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "#4b5563" }}>
              <ListItemIcon>
                <BsFillJournalBookmarkFill className="text-purple-500" />
              </ListItemIcon>
              <ListItemText primary={"Classes"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        {user?.displayName && (
          <NavLink to={"/dashboard"}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: "#4b5563" }}>
                <ListItemIcon>
                  <Dashboard sx={{ color: "#a855f7" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashbord"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}
        {user?.displayName && (
          <NavLink to={"/profile"}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: "#4b5563" }}>
                <ListItemIcon>
                  <FaUserAlt style={{ color: "#a855f7" }} />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}
        <div className="w-full items-center text-purple-500 gap-4 px-4 font-semibold flex">
          Theme Mode
          <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
        {!user?.displayName && !role ? (
          <NavLink to={"/login"}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: "#4b5563" }}>
                <ListItemIcon>
                  <Login sx={{ color: "#a855f7" }} />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut} sx={{ color: "#4b5563" }}>
              <ListItemIcon>
                <Logout sx={{ color: "#a855f7" }} />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            sx={{
              color: "#9333ea",
              outline: "none",

              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                backgroundColor: "#1b2640",
              },
              "&:focus-visible": {
                outline: "none",
              },
              "& .MuiTouchRipple-root": {
                display: "none",
              },
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            {
              <GiHamburgerMenu
                className="shadow-sm  w-10 h-10 p-1"
                style={{ fontSize: "24px" }}
              />
            }
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            sx={{ display: { md: "none" } }}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

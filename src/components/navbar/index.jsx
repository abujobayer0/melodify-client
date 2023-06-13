import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import TemporaryDrawer from "./drawer";
import { Logo, PrimaryButton, ThemeSwitcher } from "../";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../utils/firebase.init";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

const auth = getAuth(app);

const NavBar = ({ isBlack, toggleTheme, isDarkMode }) => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("role");
        navigate(location.state.from || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <nav
        className={`flex max-w-[1280px] mx-auto ${
          isBlack ? "relative" : "absolute"
        }  left-0 right-0 top-0 z-50  px-5 md:px-5 py-4    justify-center`}
      >
        <div className="flex w-48">{isBlack ? <Logo isBlack /> : <Logo />}</div>
        <div className="w-full"></div>
        <div className="hidden gap-4 items-center  md:flex ">
          <NavLink to={"/"}>
            <span
              className={`${
                isBlack ? "text-gray-100" : "text-white"
              } font-semibold`}
            >
              Home
            </span>
          </NavLink>
          <NavLink to={"/instractor"}>
            <span
              className={`${
                isBlack ? "text-gray-100" : "text-white"
              } font-semibold`}
            >
              Instructors
            </span>
          </NavLink>
          <NavLink to={"/classes"}>
            <span
              className={`${
                isBlack ? "text-gray-100" : "text-white"
              } font-semibold`}
            >
              Classes
            </span>
          </NavLink>
          {user?.displayName && (
            <NavLink to={"/dashboard"}>
              <span
                className={`${
                  isBlack ? "text-gray-100" : "text-white"
                } font-semibold`}
              >
                Dashboard
              </span>
            </NavLink>
          )}{" "}
          {!user ? (
            <NavLink to={"/login"}>
              <PrimaryButton text={"Login"} />
            </NavLink>
          ) : (
            ""
          )}{" "}
          <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          {user?.displayName && (
            <>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
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
              >
                <img
                  title={user?.displayName}
                  src={`${user?.photoURL}`}
                  className="w-12 h-12 object-cover border-none rounded-full"
                  alt=""
                />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper sx={{ backgroundColor: "#1b2640", color: "#fff" }}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <Link to={"/profile"}>
                            <MenuItem
                              sx={{
                                display: "flex ",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <FaUserAlt /> Profile
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={handleLogOut}
                            sx={{
                              display: "flex ",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <FaSignOutAlt />
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </div>
        <div className="flex md:hidden">
          <TemporaryDrawer
            user={user}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
        </div>
      </nav>
    </Box>
  );
};

export default NavBar;

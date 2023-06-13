import Dashboard from "./dashboard";
import StudentDashboard from "./studentDashboard";
import AdminDashboard from "./adminDashboard";
import { getAuth, signOut } from "firebase/auth";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
const auth = getAuth(app);
const RenderDashboard = () => {
  const [user] = useAuthState(auth);
  const roleLocal = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    localStorage.removeItem("role");
    navigate(location.state.from || "/");
  }
  if (!localStorage.getItem("role")) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div>
      {roleLocal === "instructor" ? <Dashboard /> : ""}
      {roleLocal === "student" ? <StudentDashboard /> : ""}
      {roleLocal === "admin" ? <AdminDashboard /> : ""}
    </div>
  );
};

export default RenderDashboard;

import Dashboard from "./dashboard";
import StudentDashboard from "./studentDashboard";
import AdminDashboard from "./adminDashboard";
import { getAuth, signOut } from "firebase/auth";
import app from "../utils/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import { PrimaryProgress } from "../components";
const auth = getAuth(app);
const RenderDashboard = () => {
  const [user] = useAuthState(auth);
  const roleLocal = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetData(`/user?email=${user?.email}`);
  const role = data && data[0]?.role;
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
      {!data && (
        <div className="w-full bg-dark h-screen">
          <PrimaryProgress />
        </div>
      )}
      {roleLocal && role === "instructor" ? <Dashboard /> : ""}
      {roleLocal && role === "student" ? <StudentDashboard /> : ""}
      {roleLocal && role === "admin" ? <AdminDashboard /> : ""}
    </div>
  );
};

export default RenderDashboard;

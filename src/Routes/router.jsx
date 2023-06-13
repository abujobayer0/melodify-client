import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/errorPage";
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/loginPage";
import ClassPage from "../pages/classPage";
import InstructorsPage from "../pages/instructorPage";
import PrivateRoute from "./PrivateRoute";
import RenderDashboard from "../pages/renderDashboard";
import UpdatePage from "../pages/updatePage";
import PaymentPage from "../pages/paymentPage";
import ProfilePage from "../pages/profilePage";
import InstructorProfilePage from "../pages/instructorProfilePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/instractor",
    element: <InstructorsPage />,
  },
  {
    path: "/classes",
    element: <ClassPage />,
  },
  { path: "/updateClass/:id", element: <UpdatePage /> },
  {
    path: "/class/enroll/payment/:id",
    element: (
      <PrivateRoute>
        <PaymentPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  { path: "/instructor/:email", element: <InstructorProfilePage /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RenderDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export default router;

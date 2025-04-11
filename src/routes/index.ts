import Layout from "@/routes/global/Layout";
import AuthLayout from "@/routes/auth/Layout";
import AdminLayout from "@/routes/admin/Layout";
import { createBrowserRouter } from "react-router";
import Home from "./global/Home/Home";
import SignInPage from "./auth/Sign-in/SignIn";
import SignUpPage from "./auth/Sign-up/SignUp";
import DoctorsPortalPage from "./auth/Doctors-portal/DoctorsPortal";
import DashboardPage from "./admin/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/sign-in",
        Component: SignInPage,
      },
      {
        path: "/auth/sign-up",
        Component: SignUpPage,
      },
      {
        path: "/auth/doctors-portal",
        Component: DoctorsPortalPage,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "/admin",
        Component: DashboardPage,
      },
    ],
  },
]);

export default router;

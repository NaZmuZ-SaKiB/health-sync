import Layout from "@/routes/global/Layout";
import AuthLayout from "@/routes/auth/Layout";
import AdminLayout from "@/routes/admin/Layout";
import { createBrowserRouter } from "react-router";
import Home from "./global/Home/Home";
import SignInPage from "./auth/Sign-in/SignIn";
import SignUpPage from "./auth/Sign-up/SignUp";
import DoctorsPortalPage from "./auth/Doctors-portal/DoctorsPortal";
import DashboardPage from "./admin/Dashboard/Dashboard";
import SpecialtiesPage from "./admin/Specialties/Specialties";
import EditSpecialtyPage from "./admin/Specialties/Edit/EditSpecialty";
import LocationsPage from "./admin/Locations/Locations";
import CreateLocationPage from "./admin/Locations/Create/CreateLocation";
import EditLocationPage from "./admin/Locations/Edit/EditLocation";

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
      {
        path: "/admin/specialties",
        Component: SpecialtiesPage,
      },
      {
        path: "/admin/specialties/:id",
        Component: EditSpecialtyPage,
      },
      {
        path: "/admin/locations",
        Component: LocationsPage,
      },
      {
        path: "/admin/locations/create",
        Component: CreateLocationPage,
      },
      {
        path: "/admin/locations/:id",
        Component: EditLocationPage,
      },
    ],
  },
]);

export default router;

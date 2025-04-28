import Layout from "@/routes/global/Layout";
import AuthLayout from "@/routes/auth/Layout";
import AdminLayout from "@/routes/admin/Layout";
import DashboardLayout from "@/routes/dashboard/Layout";
import { createBrowserRouter } from "react-router";
import Home from "./global/Home/Home";
import SignInPage from "./auth/Sign-in/SignIn";
import SignUpPage from "./auth/Sign-up/SignUp";
import DoctorsPortalPage from "./auth/Doctors-portal/DoctorsPortal";
import ADashboardPage from "./admin/Dashboard/ADashboard";
import SpecialtiesPage from "./admin/Specialties/Specialties";
import EditSpecialtyPage from "./admin/Specialties/Edit/EditSpecialty";
import LocationsPage from "./admin/Locations/Locations";
import CreateLocationPage from "./admin/Locations/Create/CreateLocation";
import EditLocationPage from "./admin/Locations/Edit/EditLocation";
import DoctorApplications from "./admin/Doctor-Applications/DoctorApplications";
import SingleDoctorApplication from "./admin/Doctor-Applications/Single-Doctor-Application/SingleDoctorApplication";
import DoctorsPage from "./admin/Users/Doctors/Doctors";
import SingleDoctorPage from "./admin/Users/Doctors/Single-Doctor/SingleDoctor";
import DashboardPage from "./dashboard/Dashboard";
import ProfilePage from "./dashboard/Account/Profile/Profile";

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
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/dashboard/account/profile",
        Component: ProfilePage,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "/admin",
        Component: ADashboardPage,
      },
      {
        path: "/admin/users/doctors",
        Component: DoctorsPage,
      },
      {
        path: "/admin/users/doctors/:id",
        Component: SingleDoctorPage,
      },
      {
        path: "/admin/doctor-applications",
        Component: DoctorApplications,
      },
      {
        path: "/admin/doctor-applications/:id",
        Component: SingleDoctorApplication,
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

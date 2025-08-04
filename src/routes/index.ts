import { createBrowserRouter } from "react-router";

import Home from "./global/Home/Home";
import Layout from "@/routes/global/Layout";
import MediaPage from "./admin/Media/Media";
import AuthLayout from "@/routes/auth/Layout";
import SignInPage from "./auth/Sign-in/SignIn";
import SignUpPage from "./auth/Sign-up/SignUp";
import AdminLayout from "@/routes/admin/Layout";
import DashboardPage from "./dashboard/Dashboard";
import AdminsPage from "./admin/Users/Admins/Admins";
import DashboardLayout from "@/routes/dashboard/Layout";
import DoctorsPage from "./admin/Users/Doctors/Doctors";
import LocationsPage from "./admin/Locations/Locations";
import ADashboardPage from "./admin/Dashboard/ADashboard";
import AdminServicesPage from "./admin/Services/Services";
import PatientsPage from "./admin/Users/Patients/Patients";
import ReportsPage from "./admin/Services/Reports/Reports";
import SpecialtiesPage from "./admin/Specialties/Specialties";
import ReviewsPage from "./admin/Appointments/Reviews/Reviews";
import ProfilePage from "./dashboard/Account/Profile/Profile";
import AppointmentPage from "./global/Appointment/Appointment";
import AdminProfilePage from "./admin/Account/Profile/Profile";
import PaymentsPage from "./admin/Appointments/Payments/Payments";
import EditLocationPage from "./admin/Locations/Edit/EditLocation";
import DoctorsPortalPage from "./auth/Doctors-portal/DoctorsPortal";
import MyReportsPage from "./dashboard/(Patient)/Reports/MyReports";
import SchedulesPage from "./dashboard/(Doctor)/Schedules/Schedules";
import PaymentResultPage from "./global/PaymentResult/PaymentResult";
import MyReviewsPage from "./dashboard/(Doctor)/My-Reviews/MyReviews";
import CreateAdminPage from "./admin/Users/Admins/Create/CreateAdmin";
import EditSpecialtyPage from "./admin/Specialties/Edit/EditSpecialty";
import AllAppointmentsPage from "./admin/Appointments/AllAppointments";
import ServiceReviewsPage from "./admin/Services/Reviews/ServiceReviews";
import CreateLocationPage from "./admin/Locations/Create/CreateLocation";
import SingleAdminPage from "./admin/Users/Admins/Single-Admin/SingleAdmin";
import EditAdminProfilePage from "./admin/Account/Profile/Edit/EditProfile";
import AccountEditPage from "./dashboard/Account/Profile/Edit/AccountEditPage";
import TransactionsPage from "./dashboard/(Patient)/Transactions/Transactions";
import DoctorApplications from "./admin/Doctor-Applications/DoctorApplications";
import SingleDoctorPage from "./admin/Users/Doctors/Single-Doctor/SingleDoctor";
import SinglePatientPage from "./admin/Users/Patients/Single-Patient/SinglePatient";
import MyAppointmentsPage from "./dashboard/(Patient)/My-Appointments/MyAppointments";
import ServiceAppointmentsPage from "./admin/Services/Appointments/ServiceAppointments";
import DoctorAppointmentsPage from "./dashboard/(Doctor)/Appointments/DoctorAppointments";
import PatientReportsPage from "./dashboard/(Doctor)/Appointments/Reports/PatientReports";
import SingleAppointmentPage from "./dashboard/(Doctor)/Appointments/SingleAppointment/SingleAppointmentPage";
import SingleDoctorApplication from "./admin/Doctor-Applications/Single-Doctor-Application/SingleDoctorApplication";
import SingleServiceAppointmentPage from "./admin/Services/Appointments/SingleServiceAppointment/SingleServiceAppointment";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/appointment",
        Component: AppointmentPage,
      },
      {
        path: "/payment-result",
        Component: PaymentResultPage,
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
      {
        path: "/dashboard/account/profile/edit",
        Component: AccountEditPage,
      },
      //* Patients
      {
        path: "/dashboard/my-appointments",
        Component: MyAppointmentsPage,
      },
      {
        path: "/dashboard/transactions",
        Component: TransactionsPage,
      },
      {
        path: "/dashboard/reports",
        Component: MyReportsPage,
      },

      //* Doctors
      {
        path: "/dashboard/appointments",
        Component: DoctorAppointmentsPage,
      },
      {
        path: "/dashboard/appointments/:id",
        Component: SingleAppointmentPage,
      },
      {
        path: "/dashboard/appointments/patient-reports/:id",
        Component: PatientReportsPage,
      },
      {
        path: "/dashboard/schedules",
        Component: SchedulesPage,
      },
      {
        path: "/dashboard/my-reviews",
        Component: MyReviewsPage,
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
        path: "/admin/account/profile",
        Component: AdminProfilePage,
      },
      {
        path: "/admin/account/profile/edit",
        Component: EditAdminProfilePage,
      },
      {
        path: "/admin/users/patients",
        Component: PatientsPage,
      },
      {
        path: "/admin/users/patients/:id",
        Component: SinglePatientPage,
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
        path: "/admin/users/admins",
        Component: AdminsPage,
      },
      {
        path: "/admin/users/admins/create",
        Component: CreateAdminPage,
      },
      {
        path: "/admin/users/admins/:id",
        Component: SingleAdminPage,
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
        path: "/admin/services",
        Component: AdminServicesPage,
      },
      {
        path: "/admin/services/appointments",
        Component: ServiceAppointmentsPage,
      },
      {
        path: "/admin/services/appointments/:id",
        Component: SingleServiceAppointmentPage,
      },
      {
        path: "/admin/services/reports",
        Component: ReportsPage,
      },
      {
        path: "/admin/services/reviews/:id",
        Component: ServiceReviewsPage,
      },
      {
        path: "/admin/appointments",
        Component: AllAppointmentsPage,
      },
      {
        path: "/admin/payments",
        Component: PaymentsPage,
      },
      {
        path: "/admin/reviews",
        Component: ReviewsPage,
      },
      {
        path: "/admin/media",
        Component: MediaPage,
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

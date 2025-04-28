import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/layout/DashboardTopbar";
import ProtectedRoute from "@/components/global/shared/ProtectedRoute";
import { ROLE } from "@/constants";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <ProtectedRoute role={[ROLE.PATIENT, ROLE.DOCTOR]}>
      <div className="min-h-svh bg-slate-100">
        <DashboardTopbar />
        <div className="grid flex-1 lg:grid-cols-[240px_1fr]">
          <div className="max-lg:hidden">
            <DashboardSidebar />
          </div>

          <div className="no-focus h-[calc(100svh-72px)] bg-slate-100 lg:rounded-tl-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;

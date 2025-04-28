import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProtectedRoute from "@/components/global/shared/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ROLE } from "@/constants";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <ProtectedRoute role={[ROLE.ADMIN, ROLE.SUPER_ADMIN]}>
      <div className="min-h-svh bg-slate-100">
        <SidebarProvider>
          <AdminSidebar />
          <div className="flex-1">
            <AdminTopbar />
            <Outlet />
          </div>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;

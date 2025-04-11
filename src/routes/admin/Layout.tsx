import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-svh bg-slate-100">
      <SidebarProvider>
        <AdminSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
};

export default Layout;

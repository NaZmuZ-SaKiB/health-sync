import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-svh bg-slate-100">
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex-1">
          <AdminTopbar />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;

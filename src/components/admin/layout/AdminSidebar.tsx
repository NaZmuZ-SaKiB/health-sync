import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminSidebarItems, Images } from "@/constants";
import { Link } from "react-router";

const AdminSidebar = () => {
  return (
    <Sidebar
      collapsible="icon"
      className="[&>div]:bg-primary-hover border-none"
    >
      <SidebarHeader className="border-primary flex flex-row items-center justify-center gap-3 border-b">
        <img src={Images.Logo} alt="health sync" height={40} width={40} />
        <div className="text-xl font-semibold text-slate-50">Health Sync</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="text-slate-50">
          {adminSidebarItems.map((item) => (
            <SidebarMenuItem key={`sidebar-${item.route}-${item.label}`}>
              <SidebarMenuButton asChild className="rounded-none">
                <Link to={item.route as string}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;

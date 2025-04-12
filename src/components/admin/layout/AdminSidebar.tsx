import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminSidebarItems, Images } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const AdminSidebar = () => {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="[&>div]:bg-secondary border-none">
      <SidebarHeader className="hover:bg-slate-50/5">
        <Link
          to="/"
          className="flex flex-row items-center justify-center gap-3 py-5"
        >
          <img src={Images.Logo} alt="health sync" height={40} width={40} />
          {state === "expanded" && (
            <div className={cn("text-xl font-semibold text-slate-50")}>
              Health Sync
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="text-slate-50">
          {adminSidebarItems.map((item) => (
            <SidebarMenuItem key={`sidebar-${item.route}-${item.label}`}>
              <SidebarMenuButton
                asChild
                className={cn("rounded-none", {
                  "!text-slate-50 hover:bg-slate-50/20": state === "collapsed",
                })}
                tooltip={item.label}
              >
                <Link
                  to={item.route as string}
                  className={cn({ "mx-auto": state === "collapsed" })}
                >
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminSidebarItems, Images } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const AdminSidebar = () => {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="[&>div]:bg-secondary border-none">
      <div className="bg-secondary h-full">
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
            <Accordion type="single" collapsible className="w-full">
              {adminSidebarItems.map((item) => {
                if (item?.children && item?.children?.length > 0) {
                  return (
                    <AccordionItem
                      value={`sidebar-${item.route}-${item.label}`}
                      key={`sidebar-${item.route}-${item.label}`}
                      className={cn("border-none", {
                        relative: state === "collapsed",
                      })}
                    >
                      <SidebarMenuItem>
                        <AccordionTrigger
                          className={cn(
                            "hover:text-secondary cursor-pointer rounded-none p-0 transition-none hover:bg-slate-100 hover:no-underline",
                            {
                              "!text-slate-50 hover:bg-transparent":
                                state === "collapsed",
                            },
                          )}
                        >
                          <SidebarMenuButton
                            asChild
                            className={cn("rounded-none", {
                              "!text-slate-50 hover:bg-slate-50/20":
                                state === "collapsed",
                            })}
                            tooltip={item.label}
                          >
                            <div>
                              <item.icon />
                              <span>{item.label}</span>
                            </div>
                          </SidebarMenuButton>
                        </AccordionTrigger>
                        <AccordionContent className={cn("pb-2")}>
                          <SidebarMenuSub className="gap-0">
                            {item.children.map((child) => (
                              <SidebarMenuSubItem
                                key={`sidebar-${child.route}-${child.label}`}
                              >
                                <SidebarMenuSubButton className="text-slate-300 hover:bg-transparent hover:text-slate-50">
                                  <Link
                                    to={child.route as string}
                                    className="h-full w-full"
                                  >
                                    <span>{child.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </AccordionContent>
                      </SidebarMenuItem>
                    </AccordionItem>
                  );
                } else
                  return (
                    <SidebarMenuItem
                      key={`sidebar-${item.route}-${item.label}`}
                    >
                      <SidebarMenuButton
                        asChild
                        className={cn("rounded-none", {
                          "w-full !text-slate-50 hover:bg-slate-50/20":
                            state === "collapsed",
                        })}
                        tooltip={item.label}
                      >
                        <Link to={item.route as string}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
              })}
            </Accordion>
          </SidebarMenu>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;

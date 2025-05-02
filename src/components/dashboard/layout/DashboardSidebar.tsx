import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { doctorSidebarItems, patientSidebarItems, ROLE } from "@/constants";
import useAuth from "@/hooks/use-auth";
import { Circle } from "lucide-react";
import { Link } from "react-router";

const DashboardSidebar = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  const sidebarItems =
    user?.role === ROLE.PATIENT ? patientSidebarItems : doctorSidebarItems;

  return (
    <div className="h-[calc(100svh-72px)] p-3 pt-0">
      <div className="h-full rounded-lg bg-white px-3 py-4 text-slate-50">
        <Accordion type="single" collapsible>
          {sidebarItems.map((item) => {
            if (item.children?.length) {
              return (
                <AccordionItem
                  key={`sidebar-${item.label}`}
                  value={item.label}
                  className="my-0.5 border-none"
                >
                  <AccordionTrigger className="no-focus hover:bg-primary-hover text-primary-hover data-[state=open]:bg-primary-hover [&>svg]:text-primary-hover flex items-center justify-between rounded-lg p-3 !text-base font-semibold hover:text-slate-50 hover:no-underline data-[state=open]:text-slate-50 hover:[&>svg]:text-slate-50 data-[state=open]:[&>svg]:text-slate-50">
                    {item.route ? (
                      <Link
                        to={item.route}
                        className="no-focus flex items-center"
                      >
                        <div className="mr-3">
                          {item.icon ? (
                            <item.icon className="size-5" />
                          ) : (
                            <Circle className="size-5" />
                          )}
                        </div>
                        {item.label}
                      </Link>
                    ) : (
                      <span className="no-focus flex items-center">
                        <div className="mr-3">
                          <item.icon className="size-5" />
                        </div>
                        {item.label}
                      </span>
                    )}
                  </AccordionTrigger>

                  <AccordionContent className="border-primary ml-2 border-l text-base">
                    {item.children?.map((subItem) => (
                      <div key={`sidebar-sub-${subItem.route}`}>
                        <Link
                          to={subItem.route}
                          className="no-focus text-primary-hover hover:border-primary inline-block w-full rounded-r-lg border-l-2 border-transparent px-3 py-2 pl-5 font-medium transition-all hover:bg-slate-50"
                        >
                          {subItem.label}
                        </Link>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            } else {
              return (
                <div key={`sidebar-${item.route}`} className="my-0.5">
                  <Link
                    to={item.route as string}
                    className="no-focus text-primary-hover hover:bg-primary-hover flex items-center rounded-lg font-semibold hover:text-slate-50"
                  >
                    <div className="p-3 py-3.5">
                      <item.icon className="size-5" />
                    </div>
                    {item.label}
                  </Link>
                </div>
              );
            }
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default DashboardSidebar;

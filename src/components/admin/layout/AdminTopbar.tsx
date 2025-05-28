import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const TABLET_BREAKPOINT = 1024;

const AdminTopbar = () => {
  const { toggleSidebar, state } = useSidebar();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      if (window.innerWidth < TABLET_BREAKPOINT && state === "expanded") {
        toggleSidebar();
      } else if (
        window.innerWidth >= TABLET_BREAKPOINT &&
        state === "collapsed"
      ) {
        toggleSidebar();
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [toggleSidebar, state]);

  return (
    <div className="flex h-[50px] items-center border-b bg-white">
      <SidebarTrigger />
    </div>
  );
};

export default AdminTopbar;

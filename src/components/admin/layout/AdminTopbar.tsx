import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

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
    <div className="flex h-[50px] items-center justify-between border-b bg-white">
      <SidebarTrigger />

      <Link
        to={"/admin/account/profile"}
        className="mr-4 flex items-center bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200"
      >
        <User2 className="size-5" />
        Profile
      </Link>
    </div>
  );
};

export default AdminTopbar;

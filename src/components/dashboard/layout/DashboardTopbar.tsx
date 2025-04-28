import { Link } from "react-router";
import DashboardSidebarDrawer from "./DashboardSidebarDrawer";
import { Images } from "@/constants";
import { LogOut, User } from "lucide-react";

const DashboardTopbar = () => {
  return (
    <div className="h-[72px] p-3">
      <div className="flex h-full items-center justify-between gap-5 rounded-lg bg-white px-4">
        <div className="flex items-center gap-3">
          <DashboardSidebarDrawer />

          <Link to="/">
            <img src={Images.Logo} alt="HealthSync " width={35} height={35} />
          </Link>
        </div>

        <span className="text-secondary hidden text-lg font-semibold uppercase sm:block">
          HealthSync Dashboard
        </span>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/dashboard/account/profile"
            className="flex items-center gap-1"
          >
            <User className="size-5" />
            <span>Profile</span>
          </Link>

          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => {
              // TODO: Handle logout logic here
            }}
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;

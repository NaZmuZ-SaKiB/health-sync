import MainHeader from "@/components/global/layout/MainHeader";
import TopHeader from "@/components/global/layout/TopHeader";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-svh">
      <TopHeader />
      <MainHeader />
      <Outlet />
    </div>
  );
};

export default Layout;

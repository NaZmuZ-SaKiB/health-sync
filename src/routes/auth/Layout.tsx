import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-svh">
      <Outlet />
    </div>
  );
};

export default Layout;

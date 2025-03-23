import MainHeader from "@/components/global/layout/MainHeader";
import TopHeader from "@/components/global/layout/TopHeader";

const Layout = () => {
  return (
    <div className="min-h-svh">
      <TopHeader />
      <MainHeader />
      <div className="hs-container"></div>
    </div>
  );
};

export default Layout;

import { Images } from "@/constants";
import { Link } from "react-router";
import HSButton from "../shared/HSButton";

type TNavData = {
  title: string;
  link: string;
};

const navData: TNavData[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Services",
    link: "/#services",
  },
  {
    title: "Doctors",
    link: "/#doctors",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
  {
    title: "Contact Us",
    link: "/#contact",
  },
];

const MainHeader = () => {
  return (
    <div className="bg-secondary sticky top-0 z-50 text-white">
      <div className="hs-container">
        <div className="flex items-center py-2">
          <Link to={"/"} className="group flex items-center gap-2">
            <img
              src={Images.Logo}
              height={60}
              width={60}
              alt="health sync home"
            />
            <div className="uppercase">
              <div className="group-hover:text-primary text-3xl leading-none font-bold duration-300">
                Health
              </div>
              <div className="text-primary leading-none font-semibold duration-300 group-hover:text-white">
                Sync
              </div>
            </div>
          </Link>

          <div className="flex flex-1 justify-end">
            {navData.map((item) => (
              <Link
                to={item.link}
                key={"nav-item-" + item.title}
                className="hover:text-primary p-4 text-lg font-semibold duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="pl-6">
            <Link to={"/appointment"}>
              <HSButton className="h-auto rounded-2xl px-5 py-3 text-base hover:scale-105">
                Appointment
              </HSButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;

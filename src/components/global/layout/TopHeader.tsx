import { Icons } from "@/constants";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";

type THeaderData = {
  icon: string;
  title: string;
  subTitle: string;
  link?: string;
};

const headerData: THeaderData[] = [
  {
    icon: Icons.CallIcon,
    title: "Contact Us",
    subTitle: "+123 456 7890",
  },
  {
    icon: Icons.mailIcon,
    title: "Email Support",
    subTitle: "support@gmail.com",
  },
  {
    icon: Icons.appointmentIcon,
    title: "Online Appointment",
    subTitle: "How to Book",
    link: "/#how-to-book",
  },
  {
    icon: Icons.stethoscopeIcon,
    title: "Doctors Portal",
    subTitle: "Register/ Login",
    link: "/doctors-portal",
  },
  {
    icon: Icons.accountIcon,
    title: "Patient Portal",
    subTitle: "Sign In/ Sign Up",
    link: "/sign-in",
  },
];

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between py-5">
      {headerData.map((item) => (
        <TopHeaderItem key={item.title} item={item} />
      ))}
    </div>
  );
};

const TopHeaderItem = ({ item }: { item: THeaderData }) => {
  return (
    <div className="flex gap-3">
      <img src={item.icon} width={40} height={40} alt={item.title} />
      <div>
        <p className="text-primary text-sm font-medium">{item.title}</p>
        {item?.link ? (
          <Link to={item.link} className="flex items-center font-semibold">
            {item.subTitle}{" "}
            <span className="pl-2">
              <MoveRight />
            </span>
          </Link>
        ) : (
          <p className="font-semibold">{item.subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default TopHeader;

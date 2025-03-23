import { Icons } from "@/constants";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";

type THeaderData = {
  icon: string;
  title: string;
  subTitle: string;
  link: string;
  showArrow?: boolean;
};

const headerData: THeaderData[] = [
  {
    icon: Icons.CallIcon,
    title: "Contact Us",
    subTitle: "+123 456 7890",
    link: "tel:+1234567890",
  },
  {
    icon: Icons.mailIcon,
    title: "Email Support",
    subTitle: "support@gmail.com",
    link: "mailto:support@gmail.com",
  },
  {
    icon: Icons.appointmentIcon,
    title: "Online Appointment",
    subTitle: "How to Book",
    link: "/#how-to-book",
    showArrow: true,
  },
  {
    icon: Icons.stethoscopeIcon,
    title: "Doctors Portal",
    subTitle: "Register/ Login",
    link: "/doctors-portal",
    showArrow: true,
  },
  {
    icon: Icons.accountIcon,
    title: "Patient Portal",
    subTitle: "Sign In/ Sign Up",
    link: "/sign-in",
    showArrow: true,
  },
];

const TopHeader = () => {
  return (
    <div className="hs-container">
      <div className="flex items-center justify-between py-5">
        {headerData.map((item) => (
          <TopHeaderItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

const TopHeaderItem = ({ item }: { item: THeaderData }) => {
  return (
    <div className="flex gap-3">
      <img src={item.icon} width={40} height={40} alt={item.title} />
      <div>
        <p className="text-primary text-sm font-medium">{item.title}</p>

        <Link to={item.link} className="flex items-center font-semibold">
          {item.subTitle}{" "}
          {item.showArrow && (
            <span className="pl-2">
              <MoveRight />
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;

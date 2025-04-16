import {
  BriefcaseMedical,
  LayoutDashboard,
  LucideProps,
  MapPin,
} from "lucide-react";

type TAdminSidebarChildItem = {
  label: string;
  route: string;
};

type TAdminSidebarItem = {
  label: string;
  route?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children?: TAdminSidebarChildItem[];
};

export const adminSidebarItems: TAdminSidebarItem[] = [
  {
    label: "Dashboard",
    route: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Specialties",
    route: "/admin/specialties",
    icon: BriefcaseMedical,
  },
  {
    label: "Locations",
    route: "/admin/locations",
    icon: MapPin,
  },
];

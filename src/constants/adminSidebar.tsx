import { BriefcaseMedical, LayoutDashboard, LucideProps } from "lucide-react";

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
];

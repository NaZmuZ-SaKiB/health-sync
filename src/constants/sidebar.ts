import {
  CalendarCheck,
  CalendarClock,
  LayoutDashboard,
  LucideProps,
  Settings2,
  Stethoscope,
  UserRound,
} from "lucide-react";

export type TAdminSidebarChildItem = {
  label: string;
  route: string;
};

export type TSidebarItem = {
  label: string;
  route?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children?: TAdminSidebarChildItem[];
};

export const patientSidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Account",
    icon: UserRound,
    children: [
      {
        label: "Profile",
        route: "/dashboard/account/profile",
      },
      {
        label: "Change Password",
        route: "/dashboard/account/change-password",
      },
    ],
  },
  {
    label: "Appointments",
    route: "/dashboard/my-appointments",
    icon: CalendarCheck,
  },
];

export const doctorSidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Account",
    icon: UserRound,
    children: [
      {
        label: "Profile",
        route: "/dashboard/account/profile",
      },
      {
        label: "Change Password",
        route: "/dashboard/account/change-password",
      },
    ],
  },
  {
    label: "Schedules",
    icon: CalendarClock,
    route: "/dashboard/schedules",
  },
];

export const adminSidebarItems: TSidebarItem[] = [
  {
    label: "Dashboard",
    route: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    icon: UserRound,
    children: [
      {
        label: "Patients",
        route: "/admin/users/patients",
      },
      {
        label: "Doctors",
        route: "/admin/users/doctors",
      },
      {
        label: "Admins",
        route: "/admin/users/admins",
      },
    ],
  },
  {
    label: "Doctor Settings",
    icon: Stethoscope,
    children: [
      {
        label: "Specialties",
        route: "/admin/specialties",
      },
      {
        label: "Doctor Applications",
        route: "/admin/doctor-applications",
      },
    ],
  },
  {
    label: "Settings",
    icon: Settings2,
    children: [
      {
        label: "Locations",
        route: "/admin/locations",
      },
    ],
  },
];

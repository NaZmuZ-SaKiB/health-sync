import { TBloodGroup } from "@/types";
import { TUser } from "../user/user.type";

export type TPatient = {
  id: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: TBloodGroup;
  allergies: string;
  createdAt: string;
  updatedAt: string;

  user: TUser;
  //   appointments: TAppointment[];
  // medicalReports: TMedicalReport[]
};

import { TGender, TRole } from "@/types";
import { TDoctor } from "../doctor/doctor.type";
import { TPatient } from "../patient/patient.type";

export type TUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordResetCode: number;
  passwordResetExpiry: Date;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: TGender;
  profilePicture: string; // TODO: update to image model
  role: TRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  patient?: TPatient;
  doctor?: TDoctor;
  // images: TImage[]
};

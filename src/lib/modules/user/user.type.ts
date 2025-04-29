import { TGender, TRole } from "@/types";
import { TDoctor } from "../doctor/doctor.type";
import { TPatient } from "../patient/patient.type";
import { TImage } from "../image/image.type";

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
  role: TRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  patient?: TPatient;
  doctor?: TDoctor;
  profilePicture: TImage;
};

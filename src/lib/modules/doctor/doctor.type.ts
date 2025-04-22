import { TDoctorVerificationStatus } from "@/types";
import { TLocation } from "../location/location.type";
import { TSpecialty } from "../specialty/specialty.type";
import { TUser } from "../user/user.type";

export type TDoctor = {
  id: string;
  licenseNumber: string;
  bio?: string;
  qualification: string;
  verificationStatus: TDoctorVerificationStatus;
  isVerified: boolean;
  experienceYears: number;
  fee?: number;
  appliedDate: Date;
  createdAt: Date;
  updatedAt: Date;

  user: TUser;
  specialty: TSpecialty;
  location: TLocation;
  // schedules: TSchedule[];
  // timeSlots: TTimeSlot[]
  //   appointments: TAppointment[];
  //   reviews: TReview[];
};

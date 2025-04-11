import { TSpecialty } from "../specialty/specialty.type";
import { TUser } from "../user/user.type";

export type TDoctor = {
  id: string;
  licenseNumber: string;
  bio?: string;
  qualification: string;
  isVerified: boolean;
  experienceYears: number;
  fee?: number;
  createdAt: Date;
  updatedAt: Date;

  user: TUser;
  specialty: TSpecialty;
  // location: TLocation;
  // schedules: TSchedule[];
  // timeSlots: TTimeSlot[]
  //   appointments: TAppointment[];
  //   reviews: TReview[];
};

import { TDoctorVerificationStatus } from "@/types";
import { TLocation } from "../location/location.type";
import { TSpecialty } from "../specialty/specialty.type";
import { TUser } from "../user/user.type";
import { TDoctorSchedule } from "../doctor-schedule/doctor-schedule.type";
import { TAppointment } from "../appointment/appointment.type";
import { TReview } from "../review/review.type";
import { TTimeSlot } from "../time-slot/time-slot.type";

export type TDoctor = {
  id: string;
  licenseNumber: string;
  bio?: string;
  qualification: string;
  verificationStatus: TDoctorVerificationStatus;
  isVerified: boolean;
  experienceYears: number;
  fee?: number;
  isDeleted: boolean;
  appliedDate: Date;
  createdAt: Date;
  updatedAt: Date;

  user: TUser;
  specialty: TSpecialty;
  location: TLocation;
  schedules: TDoctorSchedule[];
  timeSlots: TTimeSlot[];
  appointments: TAppointment[];
  reviews: TReview[];
};

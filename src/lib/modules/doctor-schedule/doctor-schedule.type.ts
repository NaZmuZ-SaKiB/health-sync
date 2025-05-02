import { TDay } from "@/types";
import { TDoctor } from "../doctor/doctor.type";

export type TDoctorSchedule = {
  id: string;
  day: TDay;
  startTime: string;
  endTime: string;
  sessionLength: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;

  doctor: TDoctor;
};

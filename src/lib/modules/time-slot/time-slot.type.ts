import { TDay } from "@/types";
import { TDoctor } from "../doctor/doctor.type";
import { TAppointment } from "../appointment/appointment.type";

export type TTimeSlot = {
  id: string;
  day: TDay;
  slotDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;

  doctor: TDoctor;
  appointment: TAppointment;
};

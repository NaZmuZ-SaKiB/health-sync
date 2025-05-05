import { TAppointmentStatus } from "@/types";
import { TDoctor } from "../doctor/doctor.type";
import { TPatient } from "../patient/patient.type";
import { TTimeSlot } from "../time-slot/time-slot.type";

export type TAppointment = {
  id: string;
  status: TAppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  patient: TPatient;
  doctor: TDoctor;
  timeSlot: TTimeSlot;
  // payment: TPayment;
  // report: TMedicalReport;
  // review: TReview;
};

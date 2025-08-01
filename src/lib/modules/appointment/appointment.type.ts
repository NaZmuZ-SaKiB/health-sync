import { TAppointmentStatus } from "@/types";
import { TDoctor } from "../doctor/doctor.type";
import { TPatient } from "../patient/patient.type";
import { TTimeSlot } from "../time-slot/time-slot.type";
import { TMedicalReport } from "../medical-report/medical-report.type";
import { TReview } from "../review/review.type";
import { TService } from "../service/service.type";
import { TLocation } from "../location/location.type";
import { TPayment } from "../payment/payment.type";

export type TAppointment = {
  id: string;
  status: TAppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  patient: TPatient;
  doctor: TDoctor;
  service: TService;
  location: TLocation;
  timeSlot: TTimeSlot;
  payment: TPayment;
  report: TMedicalReport;
  review: TReview;
};

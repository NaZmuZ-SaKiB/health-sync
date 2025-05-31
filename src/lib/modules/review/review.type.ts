import { TAppointment } from "../appointment/appointment.type";
import { TDoctor } from "../doctor/doctor.type";
import { TPatient } from "../patient/patient.type";
import { TService } from "../service/service.type";

export type TReview = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;

  doctor: TDoctor;
  service: TService;
  patient: TPatient;
  appointment: TAppointment;
};

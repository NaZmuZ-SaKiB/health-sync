import { TReportType } from "@/types";
import { TPatient } from "../patient/patient.type";
import { TAppointment } from "../appointment/appointment.type";

export type TMedicalReport = {
  id: string;
  title: string;
  reportType: TReportType;
  reportDate: Date;
  fileUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  patient: TPatient;
  appointment?: TAppointment;
};

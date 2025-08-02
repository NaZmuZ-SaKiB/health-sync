import { TPaymentStatus } from "@/types";
import { TAppointment } from "../appointment/appointment.type";

export type TPayment = {
  id: string;
  amount: number;
  paymentDate: string;
  transactionId: string;
  status: TPaymentStatus;
  details: string;
  createdAt: Date;
  updatedAt: Date;

  appointment: TAppointment;
};

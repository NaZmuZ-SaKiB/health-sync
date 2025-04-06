import {
  TAppointmentStatus,
  TBloodGroup,
  TDay,
  TGender,
  TNotificationType,
  TPaymentStatus,
  TReportType,
  TRole,
} from "@/types";

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export const BLOOD_GROUP = {
  A_POSITIVE: "A_POSITIVE",
  A_NEGATIVE: "A_NEGATIVE",
  B_POSITIVE: "B_POSITIVE",
  B_NEGATIVE: "B_NEGATIVE",
  O_POSITIVE: "O_POSITIVE",
  O_NEGATIVE: "O_NEGATIVE",
  AB_POSITIVE: "AB_POSITIVE",
  AB_NEGATIVE: "AB_NEGATIVE",
} as const;

export const DAY = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export const APPOINTMENT_STATUS = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export const REPORT_TYPE = {
  LAB_REPORT: "LAB_REPORT",
  PRESCRIPTION: "PRESCRIPTION",
  DIAGNOSIS: "DIAGNOSIS",
} as const;

export const NOTIFICATION_TYPE = {
  NEW_APPOINTMENT: "NEW_APPOINTMENT",
  APPOINTMENT_REMINDER: "APPOINTMENT_REMINDER",
  PAYMENT_CONFIRMATION: "PAYMENT_CONFIRMATION",
  REPORT_AVAILABLE: "REPORT_AVAILABLE",
  NORMAL: "NORMAL",
} as const;

export const ROLE = {
  PATIENT: "PATIENT",
  DOCTOR: "DOCTOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export const genders: TGender[] = ["MALE", "FEMALE", "OTHER"];

export const bloodGroups: TBloodGroup[] = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
];

export const days: TDay[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const appointmentStatuses: TAppointmentStatus[] = [
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

export const paymentStatuses: TPaymentStatus[] = [
  "PENDING",
  "COMPLETED",
  "FAILED",
  "REFUNDED",
];

export const reportTypes: TReportType[] = [
  "LAB_REPORT",
  "PRESCRIPTION",
  "DIAGNOSIS",
];

export const notificationTypes: TNotificationType[] = [
  "NEW_APPOINTMENT",
  "APPOINTMENT_REMINDER",
  "PAYMENT_CONFIRMATION",
  "REPORT_AVAILABLE",
  "NORMAL",
];

export const roles: TRole[] = ["PATIENT", "DOCTOR", "ADMIN", "SUPER_ADMIN"];

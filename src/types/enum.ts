export type TGender = "MALE" | "FEMALE" | "OTHER";

export type TBloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE";

export type TDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type TDoctorVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type TAppointmentStatus =
  | "PENDING_PAYMENT"
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type TPaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type TReportType = "LAB_REPORT" | "PRESCRIPTION" | "DIAGNOSIS";

export type TNotificationType =
  | "NEW_APPOINTMENT"
  | "APPOINTMENT_REMINDER"
  | "PAYMENT_CONFIRMATION"
  | "REPORT_AVAILABLE"
  | "NORMAL";

export type TRole = "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN";

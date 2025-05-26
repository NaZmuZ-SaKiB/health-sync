import {
  bloodGroups,
  doctorVerificationStatuses,
  genders,
  reportTypes,
} from "@/constants";
import {
  TBloodGroup,
  TDoctorVerificationStatus,
  TGender,
  TReportType,
} from "@/types";
import { z } from "zod";

const gender = z.enum(genders as [TGender, ...TGender[]], {
  errorMap: () => ({
    message: "Invalid Gender.",
  }),
});

const bloodGroup = z.enum(bloodGroups as [TBloodGroup, ...TBloodGroup[]], {
  errorMap: () => ({
    message: "Invalid Blood Group.",
  }),
});

const doctorVerificationStatus = z.enum(
  doctorVerificationStatuses as [
    TDoctorVerificationStatus,
    ...TDoctorVerificationStatus[],
  ],
  {
    errorMap: () => ({
      message: "Invalid verification status.",
    }),
  },
);

const reportType = z.enum(reportTypes as [TReportType, ...TReportType[]], {
  errorMap: () => ({
    message: "Invalid report type.",
  }),
});

export const CommonValidation = {
  gender,
  bloodGroup,
  doctorVerificationStatus,
  reportType,
};

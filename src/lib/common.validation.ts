import { bloodGroups, doctorVerificationStatuses, genders } from "@/constants";
import { TBloodGroup, TDoctorVerificationStatus, TGender } from "@/types";
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

export const CommonValidation = {
  gender,
  bloodGroup,
  doctorVerificationStatus,
};

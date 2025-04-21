import { doctorVerificationStatuses, genders } from "@/constants";
import { TDoctorVerificationStatus, TGender } from "@/types";
import { z } from "zod";

const gender = z.enum(genders as [TGender, ...TGender[]], {
  errorMap: () => ({
    message: "Invalid Gender.",
  }),
});

const doctorVerificationStatus = z.enum(
  doctorVerificationStatuses as [
    TDoctorVerificationStatus,
    ...TDoctorVerificationStatus[],
  ],
);

export const CommonValidation = {
  gender,
  doctorVerificationStatus,
};

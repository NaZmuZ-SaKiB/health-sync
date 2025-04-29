import { CommonValidation } from "./../../common.validation";

import { z } from "zod";

const update = z.object({
  firstName: z
    .string()
    .max(50, "First name must be less than 50 characters.")
    .optional(),
  lastName: z
    .string()
    .max(50, "Last name must be less than 50 characters.")
    .optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.coerce.date({ message: "Invalid Date" }).optional(),
  gender: CommonValidation.gender.optional(),
  profilePicture: z
    .string()
    .url("Invalid URL format for profile picture.")
    .optional(),
  patient: z
    .object({
      emergencyContactName: z.string().optional(),
      emergencyContactPhone: z.string().optional(),
      bloodGroup: CommonValidation.bloodGroup.optional(),
      allergies: z.string().optional(),
    })
    .optional(),
});

export const validations = {
  update,
};

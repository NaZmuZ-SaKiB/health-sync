import { z } from "zod";
import { CommonValidation } from "../../common.validation";

const create = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .nonempty({ message: "Email is required." }),
  firstName: z.string().nonempty({ message: "First name is required." }),
  lastName: z.string().nonempty({ message: "Last name is required." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
  dateOfBirth: z.string().date("Invalid date format."),
  gender: CommonValidation.gender,
  doctor: z.object({
    specialtyId: z.string().nonempty({
      message: "Specialty is required.",
    }),
    locationId: z.string().min(1, { message: "Location is required." }),
    licenseNumber: z
      .string()
      .nonempty({ message: "License number is required." }),
    bio: z.string().optional(),
    qualification: z.string().min(3, {
      message: "Qualification must be at least 3 characters long.",
    }),
    experienceYears: z.coerce
      .number()
      .min(0, { message: "Experience years must be a positive number." }),
    fee: z.coerce
      .number()
      .min(0, { message: "Fee must be a non-negative number." })
      .optional(),
  }),
});

const update = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .optional(),
  lastName: z.string().min(1, { message: "Last name is required." }).optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." })
    .optional(),
  dateOfBirth: z.string().date("Invalid date format.").optional(),
  gender: CommonValidation.gender.optional(),
  profilePicture: z.string().optional(),
  doctor: z
    .object({
      locationId: z.string().nonempty().optional(),
      licenseNumber: z
        .string()
        .min(1, { message: "License number is required." })
        .optional(),
      bio: z.string().optional(),
      qualification: z
        .string()
        .min(3, {
          message: "Qualification must be at least 3 characters long.",
        })
        .optional(),
      experienceYears: z
        .number()
        .min(0, { message: "Experience years must be a positive number." })
        .optional(),
      fee: z
        .number()
        .min(0, { message: "Fee must be a non-negative number." })
        .optional(),
    })
    .optional(),
});

const verify = z.object({
  doctorId: z.string().nonempty({ message: "Doctor ID is required." }),
  status: CommonValidation.doctorVerificationStatus,
});

export const DoctorValidation = { create, update, verify };

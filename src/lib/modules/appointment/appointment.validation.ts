import { CommonValidation } from "@/lib/common.validation";
import { z } from "zod";

const create = z.object({
  user: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    dateOfBirth: z.string().date("Invalid Date."),
    gender: CommonValidation.gender,

    patient: z.object({
      bloodGroup: CommonValidation.bloodGroup,
      allergies: z.string(),
    }),
  }),

  appointment: z.object({
    doctorId: z.string(),
    timeSlot: z.object({
      slotDate: z.string().date("Invalid Date."),
      startTime: z.string(),
      endTime: z.string(),
    }),
    reason: z.string().optional(),
  }),
});

export const AppointmentValidation = { create };

import { z } from "zod";

const update = z.object({
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, {
      message: "Start time must be in HH:MM format.",
    })
    .optional(),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "End time must be in HH:MM format." })
    .optional(),
  sessionLength: z.coerce
    .number({ invalid_type_error: "Sesson Length must be number." })
    .min(15, "Session Length must be atleast 15 min long")
    .max(60, "Max Session Length is 60 min long")
    .refine(
      (data) => data % 15 === 0,
      "Session Length must be a multiplier of 15. Ex: 15,30,45,60",
    )
    .optional(),
});

export const DoctorScheduleValidation = { update };

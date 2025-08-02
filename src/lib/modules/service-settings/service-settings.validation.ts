import moment from "moment";
import { z } from "zod";

const timeFormat = "HH:mm";

const update = z.object({
  startTime: z
    .string()
    .refine((time) => moment(time, timeFormat, true).isValid(), {
      message: "Start time must be in HH:mm format.",
    }),
  endTime: z
    .string()
    .refine((time) => moment(time, timeFormat, true).isValid(), {
      message: "End time must be in HH:mm format.",
    }),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes"),
  fee: z.coerce.number().min(0, "Fee must be non-negative"),
});

export const ServiceSettingsValidation = { update };

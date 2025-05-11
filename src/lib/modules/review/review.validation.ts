import { z } from "zod";

const create = z.object({
  rating: z.coerce
    .number({ required_error: "Rating is rquired" })
    .min(1)
    .max(5),
  comment: z.string().optional(),
});

export const ReviewValidation = { create };

import { z } from "zod";

const create = z.object({
  name: z
    .string()
    .min(3, { message: "Specialty name must have min 3 chars." })
    .max(255),
  description: z.string().max(255).optional(),
  iconId: z.string().nonempty().optional(),
});

const update = create.partial().extend({
  specialtyId: z.string().min(1, { message: "Specialty ID is required." }),
});

export const SpecialtyValidation = { create, update };

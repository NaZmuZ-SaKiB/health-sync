import { z } from "zod";

const prescriptionSchema = z.object({
  title: z.string().nonempty("Title is Required"),
  notes: z.string().nonempty("Notes is Required"),
  fileUrl: z.string().optional(),
});

export const MedicalReportValidation = {
  prescriptionSchema,
};

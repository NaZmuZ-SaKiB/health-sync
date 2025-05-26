import { CommonValidation } from "@/lib/common.validation";
import { z } from "zod";

const prescriptionSchema = z.object({
  title: z.string().nonempty("Title is Required"),
  notes: z.string().nonempty("Notes is Required"),
  fileUrl: z.string().optional(),
  reportType: CommonValidation.reportType,
});

export const MedicalReportValidation = {
  prescriptionSchema,
};

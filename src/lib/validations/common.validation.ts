import { genders } from "@/constants";
import { TGender } from "@/types";
import { z } from "zod";

const gender = z.enum(genders as [TGender, ...TGender[]], {
  errorMap: () => ({
    message: "Invalid Gender.",
  }),
});

export const CommonValidation = {
  gender,
};

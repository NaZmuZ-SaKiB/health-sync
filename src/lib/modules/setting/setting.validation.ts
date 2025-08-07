import { z } from "zod";
import {
  CONFIG_ABOUT_LIST,
  CONFIG_ABOUT_TEXT,
  CONFIG_FAQ_ITEMS,
  CONFIG_FEATURED_DOCTOR,
  CONFIG_FEATURED_SERVICES,
  CONFIG_FEATURED_SPECIALTIES,
  CONFIG_HERO_IMAGE,
  CONFIG_HERO_REVIEW,
  CONFIG_HERO_SUBTITLE_TEXT,
  CONFIG_HERO_TITLE_TEXT,
  CONFIG_OPENING_HOURS,
  CONFIG_PRESIDENT_EXPERIENCE,
  CONFIG_PRESIDENT_IMAGE,
  CONFIG_PRESIDENT_NAME,
  CONFIG_PRESIDENT_POSITION,
  CONFIG_PRESIDENT_SKILLS,
  CONFIG_PRESIDENT_TEXT,
  CONFIG_TESTIMONIAL_IMAGE,
} from "./setting.constant";

const update = z.object({
  key: z
    .string({
      required_error: "Key is required",
    })
    .nonempty({
      message: "Key is required",
    }),

  value: z
    .string({
      required_error: "Value is required",
    })
    .nonempty({
      message: "Value is required",
    }),
});

const updateMany = z.array(update);

const homepage = z.object({
  [CONFIG_HERO_TITLE_TEXT]: z.string().nonempty().optional(),
  [CONFIG_HERO_SUBTITLE_TEXT]: z.string().nonempty().optional(),
  [CONFIG_FEATURED_DOCTOR]: z.string().nonempty().optional(),
  [CONFIG_HERO_REVIEW]: z.string().nonempty().optional(),
  [CONFIG_HERO_IMAGE]: z.string().nonempty().optional(),

  [CONFIG_ABOUT_TEXT]: z.string().nonempty().optional(),
  [CONFIG_ABOUT_LIST]: z.string().nonempty().optional(),

  [CONFIG_TESTIMONIAL_IMAGE]: z.string().nonempty().optional(),

  [CONFIG_PRESIDENT_NAME]: z.string().nonempty().optional(),
  [CONFIG_PRESIDENT_POSITION]: z.string().nonempty().optional(),
  [CONFIG_PRESIDENT_EXPERIENCE]: z.coerce.number().min(0).max(50).optional(),
  [CONFIG_PRESIDENT_TEXT]: z.string().nonempty().optional(),
  [CONFIG_PRESIDENT_SKILLS]: z.string().nonempty().optional(),
  [CONFIG_PRESIDENT_IMAGE]: z.string().nonempty().optional(),

  [CONFIG_FEATURED_SERVICES]: z
    .array(z.string().nonempty().optional())
    .optional(),
  [CONFIG_FEATURED_SPECIALTIES]: z
    .array(z.string().nonempty().optional())
    .optional(),
  [CONFIG_FAQ_ITEMS]: z.array(
    z.object({
      question: z.string().nonempty().optional(),
      answer: z.string().nonempty().optional(),
    }),
  ),
});

const openingHours = z.object({
  [CONFIG_OPENING_HOURS]: z
    .object({
      monday: z.string().nonempty().max(255).optional(),
      tuesday: z.string().nonempty().max(255).optional(),
      wednesday: z.string().nonempty().max(255).optional(),
      thursday: z.string().nonempty().max(255).optional(),
      friday: z.string().nonempty().max(255).optional(),
      saturday: z.string().nonempty().max(255).optional(),
      sunday: z.string().nonempty().max(255).optional(),
    })
    .optional(),
});

export const SettingValidation = {
  update,
  updateMany,
  homepage,
  openingHours,
};

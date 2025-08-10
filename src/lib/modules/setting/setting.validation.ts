import { z } from "zod";
import {
  CONFIG_ABOUT_LIST,
  CONFIG_ABOUT_TEXT,
  CONFIG_CONTACT_EMAIL,
  CONFIG_CONTACT_PHONE,
  CONFIG_FAQ_ITEMS,
  CONFIG_FEATURED_DOCTOR,
  CONFIG_FEATURED_SERVICES,
  CONFIG_FEATURED_SPECIALTIES,
  CONFIG_FOOTER_TEXT,
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
  CONFIG_SOCIAL_LINKS,
  CONFIG_SUPPORT_EMAIL,
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
  [CONFIG_HERO_TITLE_TEXT]: z.string().optional(),
  [CONFIG_HERO_SUBTITLE_TEXT]: z.string().optional(),
  [CONFIG_FEATURED_DOCTOR]: z.string().optional(),
  [CONFIG_HERO_REVIEW]: z.string().optional(),
  [CONFIG_HERO_IMAGE]: z.string().optional(),

  [CONFIG_ABOUT_TEXT]: z.string().optional(),
  [CONFIG_ABOUT_LIST]: z.string().optional(),

  [CONFIG_TESTIMONIAL_IMAGE]: z.string().optional(),

  [CONFIG_PRESIDENT_NAME]: z.string().optional(),
  [CONFIG_PRESIDENT_POSITION]: z.string().optional(),
  [CONFIG_PRESIDENT_EXPERIENCE]: z.coerce.number().min(0).max(50).optional(),
  [CONFIG_PRESIDENT_TEXT]: z.string().optional(),
  [CONFIG_PRESIDENT_SKILLS]: z.string().optional(),
  [CONFIG_PRESIDENT_IMAGE]: z.string().optional(),

  [CONFIG_FEATURED_SERVICES]: z.array(z.string().optional()).optional(),
  [CONFIG_FEATURED_SPECIALTIES]: z.array(z.string().optional()).optional(),
  [CONFIG_FAQ_ITEMS]: z
    .array(
      z
        .object({
          question: z.string().optional(),
          answer: z.string().optional(),
        })
        .optional(),
    )
    .optional(),
});

const openingHours = z.object({
  [CONFIG_OPENING_HOURS]: z
    .object({
      monday: z.string().max(255).optional(),
      tuesday: z.string().max(255).optional(),
      wednesday: z.string().max(255).optional(),
      thursday: z.string().max(255).optional(),
      friday: z.string().max(255).optional(),
      saturday: z.string().max(255).optional(),
      sunday: z.string().max(255).optional(),
    })
    .optional(),
});

const contact = z.object({
  [CONFIG_CONTACT_EMAIL]: z.string().email("Invalid Email.").optional(),
  [CONFIG_SUPPORT_EMAIL]: z.string().email("Invalid Email.").optional(),
  [CONFIG_CONTACT_PHONE]: z.string().max(14),
  [CONFIG_SOCIAL_LINKS]: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
});

const footer = z.object({
  [CONFIG_FOOTER_TEXT]: z.string().optional(),
});

export const SettingValidation = {
  update,
  updateMany,
  homepage,
  openingHours,
  contact,
  footer,
};

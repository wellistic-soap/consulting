import { z } from "zod";

import {
  BEST_TIME_OPTIONS,
  LANGUAGE_OPTIONS,
  LOCATION_OPTIONS,
  REVENUE_OPTIONS,
  VERTICAL_OPTIONS,
} from "./callback-options";

const phone = z
  .string()
  .trim()
  .min(7)
  .max(25)
  .refine((v) => (v.replace(/\D/g, "").length >= 10), { message: "phone" });

export const callbackSchema = z.object({
  name: z.string().trim().min(2, "name").max(100),
  business: z.string().trim().min(2, "business").max(150),
  vertical: z.enum(VERTICAL_OPTIONS),
  locations: z.enum(LOCATION_OPTIONS),
  revenue: z.enum(REVENUE_OPTIONS),
  phone,
  language: z.enum(LANGUAGE_OPTIONS),
  bestTime: z.enum(BEST_TIME_OPTIONS),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot: must stay empty
  website: z.string().max(500).optional().default(""),
  locale: z.enum(LANGUAGE_OPTIONS).default("en"),
});

export type CallbackInput = z.infer<typeof callbackSchema>;

import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

export const basic = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({}),
});

export const validateReferralCodeSchema = z.object({
  body: z.object({
    code: z.string(),
  }),
});

export type ValidateReferralCode = z.infer<typeof validateReferralCodeSchema>;

export const findAllReferralByReferralId = z.object({
  query: z.object({
    limit: limitSchema,
    page: pageNumberSchema,
    referralId: z.coerce.number(),
  }),
});

export type FindAllReferralByReferralId = z.infer<
  typeof findAllReferralByReferralId
>;

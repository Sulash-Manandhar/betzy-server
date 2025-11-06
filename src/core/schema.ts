import z from "zod";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "./constant";

export const pageNumberSchema = z.coerce.number().min(1).default(DEFAULT_PAGE);
export const limitSchema = z.coerce.number().min(1).default(DEFAULT_LIMIT);

export const basicSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({}),
});

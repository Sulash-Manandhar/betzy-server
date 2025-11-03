import z from "zod";

export const pageNumberSchema = z.coerce.number().min(1);
export const limitSchema = z.coerce.number().min(1);

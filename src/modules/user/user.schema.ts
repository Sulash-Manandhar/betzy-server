import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const createUserSchema = z.object({
  body: {
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    email: z.email(),
    profileUrl: z.string().optional().nullable(),
    clerkId: z.string(),
    timezone: z.string().optional(),
  },
});

export const findAllUserSchema = z.object({
  query: z.object({
    email: z.string().optional().nullable(),
    limit: limitSchema,
    page: pageNumberSchema,
  }),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type FindAllUser = z.infer<typeof findAllUserSchema>;

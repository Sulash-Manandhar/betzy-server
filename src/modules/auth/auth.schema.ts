import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.email(),
    clerkId: z.string(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    profileUrl: z.string().optional().nullable(),
    timezone: z.string().optional(),
  }),
});

export type CreateUserZodSchema = z.infer<typeof createUserSchema>;

export type CreateUserPayloadBody = z.infer<typeof createUserSchema>["body"];

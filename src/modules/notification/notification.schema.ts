import { NOTIFICATION_TYPES } from "@/core/constant";
import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.number(),
    title: z.string(),
    description: z.string().optional().nullable(),
    type: z.enum(NOTIFICATION_TYPES),
  }),
});

export const findAllNotificationSchema = z.object({
  query: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(NOTIFICATION_TYPES).optional(),
    limit: limitSchema,
    page: pageNumberSchema,
  }),
});

export type FindAllNotification = z.infer<typeof findAllNotificationSchema>;

export type CreateNotification = z.infer<typeof createNotificationSchema>;

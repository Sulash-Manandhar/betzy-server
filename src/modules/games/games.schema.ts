import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const createGameSchema = z.object({
  body: z.object({
    name: z.string(),
    game_link: z.string().optional(),
    image_id: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const updateGameSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    game_link: z.string().optional(),
    image_id: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const findAllGameSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    limit: limitSchema,
    page: pageNumberSchema,
  }),
});

export type CreateGamePayload = z.infer<typeof createGameSchema>["body"];
export type UpdateGamePayload = z.infer<typeof updateGameSchema>["body"];
export type FindAllGamePayload = z.infer<typeof findAllGameSchema>["query"];

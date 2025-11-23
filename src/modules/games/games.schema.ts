import { GAME_TYPES } from "@/core/constant";
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
    image_id: z.coerce.number().optional(),
    description: z.string().optional(),
    type: z.enum(GAME_TYPES).default("OFF_MARKET"),
    is_featured: z.coerce.boolean().optional().default(true),
    is_active: z.coerce.boolean().default(true),
  }),
});

export const updateGameSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    name: z.string().optional(),
    game_link: z.coerce.string().optional(),
    image_id: z.number().optional(),
    type: z.enum(GAME_TYPES).default("OFF_MARKET").optional(),
    description: z.string().optional(),
    is_active: z.coerce.boolean().optional(),
  }),
});

export const findAllGameSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    game_type: z.enum(GAME_TYPES).optional(),
    limit: limitSchema,
    page: pageNumberSchema,
  }),
});

export type CreateGame = z.infer<typeof createGameSchema>;
export type CreateGamePayload = z.infer<typeof createGameSchema>["body"];
export type UpdateGame = z.infer<typeof updateGameSchema>;
export type UpdateGamePayload = z.infer<typeof updateGameSchema>["body"];

export type FindAllGame = z.infer<typeof findAllGameSchema>;
export type FindAllGamePayload = z.infer<typeof findAllGameSchema>["query"];

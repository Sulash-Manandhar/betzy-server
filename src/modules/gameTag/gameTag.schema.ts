import { GAME_STATUS } from "@/core/constant";
import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const createGameTagSchema = z.object({
  body: z.object({
    gameTag: z.string(),
    gameId: z.number(),
    password: z.string(),
  }),
  params: z.object({
    userId: z.coerce.number(),
  }),
});

export const findAllGameTagSchema = z.object({
  query: z.object({
    limit: limitSchema,
    page: pageNumberSchema,
    gameId: z.number().optional().nullable(),
    status: z.enum(GAME_STATUS).optional().nullable(),
  }),
  params: z.object({
    userId: z.coerce.number(),
  }),
});

export const updateGameTagSchema = z.object({
  body: z.object({
    gameTag: z.string().optional(),
    gameId: z.number().optional(),
    password: z.string().optional(),
    status: z.enum(GAME_STATUS),
  }),
  params: z.object({
    gameTagId: z.coerce.number(),
  }),
});

export type CreateGameTag = z.infer<typeof createGameTagSchema>;
export type UpdateGameTag = z.infer<typeof updateGameTagSchema>;
export type FindAllGameTag = z.infer<typeof findAllGameTagSchema>;

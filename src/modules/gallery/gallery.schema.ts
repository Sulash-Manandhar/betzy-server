import { limitSchema, pageNumberSchema } from "@/core/schema";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const findAllImageSchema = z.object({
  query: z.object({
    limit: limitSchema,
    page: pageNumberSchema,
  }),
});

export type FindAllImagePayload = z.infer<typeof findAllImageSchema>;

export type CreateImagePayload = {
  fileName: string;
  url: string;
};

export type ImagePayload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

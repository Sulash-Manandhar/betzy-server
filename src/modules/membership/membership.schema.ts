import { ORDER_BY_TYPE } from "@/core/constant";
import { limitSchema, pageNumberSchema } from "@/core/schema";
import type { Membership } from "prisma/generated/prisma/client";
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const findAllMembershipSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    limit: limitSchema,
    page: pageNumberSchema,
    orderby: z.enum(ORDER_BY_TYPE).optional().nullable(),
  }),
});

export type FindAllMembership = z.infer<typeof findAllMembershipSchema>;

export type CurrentMembershipResponse = {
  id: number;
  balance: number;
  previousMembership: Membership | null;
  membership: Membership | null;
  nextMembership: Membership | null;
  xp: number;
};

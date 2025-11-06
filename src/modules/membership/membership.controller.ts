import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import { Boom, HTTPStatusCode } from "@/utils/packages";
import type { Request, Response } from "express";
import {
  findAllMembershipSchema,
  type FindAllMembership,
} from "./membership.schema";
import membershipService from "./membership.service";
import { getAuth } from "@clerk/express";

const membershipController = {
  findAll: asyncValidationHandler<FindAllMembership>(findAllMembershipSchema)(
    async (req, res, validated) => {
      const membership = await membershipService.findAll(validated.query);
      res.status(HTTPStatusCode.CREATED).json(membership);
    }
  ),
  currentMembership: asyncHandler(async (req: Request, res: Response) => {
    const clerkId = getAuth(req)?.userId;
    if (!clerkId) {
      throw Boom.badRequest("User not found, please login again");
    }
    const response = await membershipService.currentMembership(clerkId);
    res.status(HTTPStatusCode.OK).json(response);
  }),
};
export default membershipController;

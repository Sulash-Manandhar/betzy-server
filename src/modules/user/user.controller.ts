import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import { Boom, HTTPStatusCode } from "@/utils/packages";
import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { findAllUserSchema, type FindAllUser } from "./user.schema";
import userService from "./user.service";

const userController = {
  findAll: asyncValidationHandler<FindAllUser>(findAllUserSchema)(
    async (req, res, validated) => {
      const response = await userService.findAll(validated.query);
      res.status(HTTPStatusCode.CREATED).json(response);
    }
  ),
  findOne: asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const response = await userService.findById(id);
    res.status(HTTPStatusCode.CREATED).json(response);
  }),
  points: asyncHandler(async (req: Request, res: Response) => {
    const clerkId = getAuth(req)?.userId;
    if (!clerkId) {
      throw Boom.badRequest("User not found, please login again");
    }
    const response = await userService.getUserPoints(clerkId);
    res.status(HTTPStatusCode.CREATED).json(response);
  }),
};
export default userController;

import { asyncHandler } from "@/helpers/asyncHandler";
import type { Request, Response } from "express";
import { userService } from "./user.service";

const userController = {
  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const response = await userService.getAllUsers();
    res.status(201).json(response);
  }),
};

export default userController;

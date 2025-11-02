import { asyncHandler } from "@/helpers/asyncHandler";
import type { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const response = await authService.clerkCreate(req.body);
    res.status(201).json(response);
  }),
};

import { asyncValidationHandler } from "@/helpers/asyncHandler";
import { createUserSchema, type CreateUserZodSchema } from "./auth.schema";
import { authService } from "./auth.service";
import { HTTPStatusCode } from "@/utils/packages";

export const authController = {
  create: asyncValidationHandler<CreateUserZodSchema>(createUserSchema)(
    async (req, res, validated) => {
      const response = await authService.clerkCreate(validated.body);
      res.status(HTTPStatusCode.CREATED).json(response);
    }
  ),
};

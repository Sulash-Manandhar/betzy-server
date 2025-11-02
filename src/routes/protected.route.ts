import type { Route } from "@/core/types";
import { validate } from "@/middleware/validator";
import { authController } from "@/modules/auth/auth.controller";
import { createUserSchema } from "@/modules/auth/auth.schema";

const protectedRoutes: Route[] = [
  {
    url: "/customer/create",
    type: "protected",
    method: "post",
    description: "Create a user in database when user sign up using clerk.",
    handler: authController.create,
    tags: ["User"],
    validator: validate(createUserSchema),
  },
];

export default protectedRoutes;

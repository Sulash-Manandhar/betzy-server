import type { Route } from "@/core/types";
import { authController } from "@/modules/auth/auth.controller";

const protectedRoutes: Route[] = [
  {
    tags: ["User"],
    url: "/customer/create",
    type: "protected",
    method: "post",
    description: "Create a user in database when user sign up using clerk.",
    // schema: createUserSchema,
    handler: authController.create,
  },
];

export default protectedRoutes;

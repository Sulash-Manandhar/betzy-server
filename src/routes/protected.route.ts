import type { Route } from "@/core/types";
import { authController } from "@/modules/auth/auth.controller";
import membershipController from "@/modules/membership/membership.controller";

const protectedRoutes: Route[] = [
  {
    tags: ["User"],
    url: "/customer/create",
    type: "protected",
    method: "post",
    description: "Create a user in database when user sign up using clerk.",
    handler: authController.create,
  },
  {
    url: "/membership/current",
    type: "protected",
    method: "get",
    description: "Get user membership level",
    tags: ["Membership"],
    handler: membershipController.currentMembership,
  },
];

export default protectedRoutes;

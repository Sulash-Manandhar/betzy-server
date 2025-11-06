import type { Route } from "@/core/types";
import { authController } from "@/modules/auth/auth.controller";
import membershipController from "@/modules/membership/membership.controller";
import notificationController from "@/modules/notification/notification.controller";
import userController from "@/modules/user/user.controller";

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
  {
    url: "/notification",
    type: "protected",
    method: "post",
    description: "Create a new notification",
    tags: ["Notification"],
    handler: notificationController.create,
  },
  {
    url: "/customer/points",
    type: "protected",
    method: "get",
    description: "Get user points",
    tags: ["User"],
    handler: userController.points,
  },
];

export default protectedRoutes;

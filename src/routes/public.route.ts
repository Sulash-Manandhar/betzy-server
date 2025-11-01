import type { Route } from "@/core/types";
import userController from "@/modules/user/user.controller";

export const publicRoutes: Route[] = [
  {
    url: "/user",
    type: "public",
    method: "get",
    description: "Get all users",
    tags: ["User"],
    handler: userController.getAllUsers,
  },
];

import type { Route } from "@/core/types";
import gamesController from "@/modules/games/games.controller";
import notificationController from "@/modules/notification/notification.controller";

const adminRoutes: Route[] = [
  {
    url: "/game",
    type: "admin",
    method: "post",
    description: "Create a new game",
    tags: ["Game"],
    handler: gamesController.create,
  },
  {
    url: "/game/:id",
    type: "admin",
    method: "put",
    description: "Update a game",
    tags: ["Game"],
    handler: gamesController.update,
  },
  {
    url: "/game/:id",
    type: "admin",
    method: "delete",
    description: "Delete a new game",
    tags: ["Game"],
    handler: gamesController.destroy,
  },
  {
    url: "/notification",
    type: "admin",
    method: "get",
    description: "Get all notification",
    tags: ["Notification"],
    handler: notificationController.findAll,
  },
];

export default adminRoutes;

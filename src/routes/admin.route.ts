import type { Route } from "@/core/types";
import gamesController from "@/modules/games/games.controller";

const adminRoutes: Route[] = [
  {
    url: "/game",
    type: "admin",
    method: "post",
    description: "Create a new game",
    tags: ["Game"],
    // schema: createGameSchema,
    handler: gamesController.create,
  },
  {
    url: "/game/:id",
    type: "admin",
    method: "put",
    description: "Update a game",
    tags: ["Game"],
    // schema: updateGameSchema,
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
];

export default adminRoutes;

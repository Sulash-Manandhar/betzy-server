import type { Route } from "@/core/types";
import gamesController from "@/modules/games/games.controller";

export const publicRoutes: Route[] = [
  {
    url: "/game",
    type: "public",
    method: "get",
    description: "Get all games",
    tags: ["Game"],
    handler: gamesController.findAll,
  },
  {
    url: "/game/:id",
    type: "public",
    method: "get",
    description: "Get game  detail",
    tags: ["Game"],
    handler: gamesController.findOne,
  },
];

import type { Route } from "@/core/types";
import gamesController from "@/modules/games/games.controller";
import membershipController from "@/modules/membership/membership.controller";

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
  {
    url: "/membership",
    type: "public",
    method: "get",
    description: "Get membership list",
    tags: ["Membership"],
    handler: membershipController.findAll,
  },
];

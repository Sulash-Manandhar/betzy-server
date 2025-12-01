import type { Route } from "@/core/types";
import gamesController from "@/modules/games/games.controller";
import gameTagController from "@/modules/gameTag/gameTag.controller";
import membershipController from "@/modules/membership/membership.controller";
import { referralController } from "@/modules/referral/referral.controller";

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
  {
    url: "/customer/game-tag/:gameTagId",
    type: "public",
    method: "get",
    description: "Get customer game tag by id",
    tags: ["UserGameTag"],
    handler: gameTagController.findOne,
  },
  {
    url: "/customer/:userId/game-tag",
    type: "public",
    method: "get",
    description: "Get all game tag of a customer",
    tags: ["UserGameTag"],
    handler: gameTagController.findAll,
  },
  {
    url: "/customer/:userId/game-tag",
    type: "public",
    method: "get",
    description: "Get all game tag of a customer",
    tags: ["UserGameTag"],
    handler: gameTagController.findAll,
  },
  {
    url: "/referral/validate",
    type: "public",
    method: "post",
    description: "Validate referral code",
    tags: ["Referral"],
    handler: referralController.validate,
  },
];

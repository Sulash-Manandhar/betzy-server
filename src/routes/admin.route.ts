import type { Route } from "@/core/types";
import galleryController from "@/modules/gallery/gallery.controller";
import gamesController from "@/modules/games/games.controller";
import gameTagController from "@/modules/gameTag/gameTag.controller";
import notificationController from "@/modules/notification/notification.controller";
import userController from "@/modules/user/user.controller";

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
  {
    url: "/user",
    type: "admin",
    method: "get",
    description: "Get all users",
    tags: ["User"],
    handler: userController.findAll,
  },
  {
    url: "/user/:id",
    type: "admin",
    method: "get",
    description: "Get user detail",
    tags: ["User"],
    handler: userController.findOne,
  },
  {
    url: "/customer/:userId/game-tag",
    type: "admin",
    method: "post",
    description: "Create customer's a new game tag",
    tags: ["CustomerGameTag"],
    handler: gameTagController.create,
  },
  {
    url: "/customer/game-tag/:gameTagId",
    type: "admin",
    method: "put",
    description: "Update customer's a new game tag",
    tags: ["CustomerGameTag"],
    handler: gameTagController.update,
  },
  {
    url: "/customer/game-tag/:gameTagId",
    type: "admin",
    method: "delete",
    description: "Delete customer's a new game tag",
    tags: ["CustomerGameTag"],
    handler: gameTagController.destroy,
  },
  {
    url: "/gallery/upload",
    type: "admin",
    method: "post",
    description: "Upload a single image",
    tags: ["Image"],
    handler: galleryController.createImage,
  },
  {
    url: "/gallery/uploads",
    type: "admin",
    method: "post",
    description: "Upload a mulitple image",
    tags: ["Image"],
    handler: galleryController.createImages,
  },
  {
    url: "/gallery",
    type: "admin",
    method: "get",
    description: "Get images list",
    tags: ["Image"],
    handler: galleryController.findAll,
  },
  {
    url: "/gallery/:id",
    type: "admin",
    method: "delete",
    description: "Delete an images",
    tags: ["Image"],
    handler: galleryController.destroy,
  },
];

export default adminRoutes;

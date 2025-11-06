import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import { HTTPStatusCode } from "@/utils/packages";
import type { Request, Response } from "express";
import {
  createGameSchema,
  findAllGameSchema,
  updateGameSchema,
  type CreateGame,
  type FindAllGame,
  type UpdateGame,
} from "./games.schema";
import gamesService from "./games.service";

const gamesController = {
  create: asyncValidationHandler<CreateGame>(createGameSchema)(
    async (req, res, validated) => {
      const game = await gamesService.create(validated.body);
      res.status(HTTPStatusCode.CREATED).json(game);
    }
  ),
  update: asyncValidationHandler<UpdateGame>(updateGameSchema)(
    async (req, res, validated) => {
      const game = await gamesService.update(validated.params.id, req.body);
      res.status(HTTPStatusCode.ACCEPTED).json(game);
    }
  ),
  findOne: asyncHandler(async (req: Request<{ id: number }>, res: Response) => {
    const game = await gamesService.findOne(Number(req.params.id));
    res.status(HTTPStatusCode.OK).json(game);
  }),
  destroy: asyncHandler(async (req: Request<{ id: number }>, res: Response) => {
    const response = await gamesService.destroy(Number(req.params.id));
    res.status(HTTPStatusCode.OK).json(response);
  }),
  findAll: asyncValidationHandler<FindAllGame>(findAllGameSchema)(
    async (req, res, validated) => {
      const response = await gamesService.findAll(validated.query);
      res.status(HTTPStatusCode.OK).json(response);
    }
  ),
};
export default gamesController;

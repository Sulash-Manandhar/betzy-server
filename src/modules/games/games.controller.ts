import { asyncHandler } from "@/helpers/asyncHandler";
import type { Request, Response } from "express";
import gamesService from "./games.service";
import type { CreateGamePayload, FindAllGamePayload } from "./games.schema";
import { HTTPStatusCode } from "@/utils/packages";

const gamesController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const game = await gamesService.create(req.body);
    res.status(HTTPStatusCode.CREATED).json(game);
  }),
  update: asyncHandler(
    async (
      req: Request<{ id: number }, {}, CreateGamePayload>,
      res: Response
    ) => {
      const game = await gamesService.update(req.params.id, req.body);
      res.status(HTTPStatusCode.ACCEPTED).json(game);
    }
  ),
  findOne: asyncHandler(async (req: Request<{ id: number }>, res: Response) => {
    const game = await gamesService.findOne(req.params.id);
    res.status(HTTPStatusCode.OK).json(game);
  }),
  destroy: asyncHandler(async (req: Request<{ id: number }>, res: Response) => {
    const response = await gamesService.destroy(req.params.id);
    res.status(HTTPStatusCode.OK).json(response);
  }),
  findAll: asyncHandler(
    async (req: Request<{}, {}, {}, FindAllGamePayload>, res: Response) => {
      const response = await gamesService.findAll(req.query);
      res.status(HTTPStatusCode.OK).json(response);
    }
  ),
};
export default gamesController;

import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import { HTTPStatusCode } from "@/utils/packages";
import type { Request, Response } from "express";
import {
  createGameTagSchema,
  findAllGameTagSchema,
  updateGameTagSchema,
  type CreateGameTag,
  type FindAllGameTag,
  type UpdateGameTag,
} from "./gameTag.schema";
import gameTagService from "./gameTag.service";

const gameTagController = {
  findAll: asyncValidationHandler<FindAllGameTag>(findAllGameTagSchema)(
    async (req, res, validated) => {
      const response = await gameTagService.findAll(
        validated.params.userId,
        validated.query
      );
      res.status(HTTPStatusCode.OK).json(response);
    }
  ),
  create: asyncValidationHandler<CreateGameTag>(createGameTagSchema)(
    async (req, res, validate) => {
      const response = await gameTagService.create(
        validate.params.userId,
        validate.body
      );
      res.status(HTTPStatusCode.CREATED).json(response);
    }
  ),
  update: asyncValidationHandler<UpdateGameTag>(updateGameTagSchema)(
    async (req, res, validate) => {
      const response = await gameTagService.update(
        validate.params.gameTagId,
        validate.body
      );
      res.status(HTTPStatusCode.OK).json(response);
    }
  ),
  destroy: asyncHandler(
    async (req: Request<{ gameTagId: string }>, res: Response) => {
      const data = await gameTagService.destroy(Number(req.params.gameTagId));
      res.status(HTTPStatusCode.OK).json(data);
    }
  ),
  findOne: asyncHandler(
    async (req: Request<{ gameTagId: string }>, res: Response) => {
      const data = await gameTagService.findOne(Number(req.params.gameTagId));
      res.status(HTTPStatusCode.OK).json(data);
    }
  ),
};
export default gameTagController;

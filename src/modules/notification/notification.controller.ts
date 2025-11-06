import { asyncValidationHandler } from "@/helpers/asyncHandler";
import { HTTPStatusCode } from "@/utils/packages";
import type { Request, Response } from "express";
import {
  createNotificationSchema,
  findAllNotificationSchema,
  type CreateNotification,
  type FindAllNotification,
} from "./notification.schema";
import notificationService from "./notification.service";

const notificationController = {
  create: asyncValidationHandler<CreateNotification>(createNotificationSchema)(
    async (req, res, validated) => {
      const response = await notificationService.create(validated.body);
      res.status(HTTPStatusCode.CREATED).json(response);
    }
  ),
  findAll: asyncValidationHandler<FindAllNotification>(
    findAllNotificationSchema
  )(async (req: Request, res: Response, validated) => {
    const response = await notificationService.findAll(validated.query);
    res.status(HTTPStatusCode.OK).json(response);
  }),
};
export default notificationController;

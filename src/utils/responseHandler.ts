import type { Response } from "express";

interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  meta?: {};
}

export const sendSuccess = (
  res: Response,
  data: any,
  message?: string,
  statusCode: number = 200,
  meta?: {}
): Response<SuccessResponse> => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    meta,
  });
};

export const sendCreated = (
  res: Response,
  data: any,
  message: string = "Resource created successfully"
): Response<SuccessResponse> => {
  return sendSuccess(res, data, message, 201);
};

export const sendNoContent = (res: Response): Response => {
  return res.status(204).send();
};

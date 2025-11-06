import { Boom } from "@/utils/packages";
import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

type AsyncFunction<Params = {}, ResBody = {}, ReqBody = {}, ReqQuery = {}> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction
) => Promise<any>;

export function asyncHandler<Params, ResBody, ReqBody, ReqQuery>(
  fn: AsyncFunction<Params, ResBody, ReqBody, ReqQuery>
) {
  return (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function asyncValidationHandler<T>(schema?: ZodObject) {
  return (
    fn: (
      req: Request,
      res: Response,
      validated: T,
      next: NextFunction
    ) => Promise<any>
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validated = (await schema?.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        })) as T;

        await fn(req, res, validated, next);
      } catch (error) {
        if (error instanceof ZodError) {
          next(
            Boom.badRequest("Validation failed", {
              errors: error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
              })),
            })
          );
        } else {
          next(error);
        }
      }
    };
  };
}

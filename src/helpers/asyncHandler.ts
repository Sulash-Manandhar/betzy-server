import type { Request, Response, NextFunction } from "express";

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

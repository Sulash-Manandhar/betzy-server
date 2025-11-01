import { rolesAndPermissions } from "@/core/rolesAndPermissions";
import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";
import HTTPStatusCode from "http-status-codes";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  const roles = Object.values(auth.sessionClaims?.membership as any);
  if (roles.length === 0 && !roles.includes(rolesAndPermissions.admin)) {
    return res.status(HTTPStatusCode.FORBIDDEN).json({
      message: HTTPStatusCode.getStatusText(HTTPStatusCode.FORBIDDEN),
    });
  }
  return next();
};

export default isAdmin;

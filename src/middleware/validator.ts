import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import Boom from "@hapi/boom";
import type { AnyZodObject } from "zod/v3";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        next(
          Boom.badRequest("Validation failed", {
            errors,
          })
        );
      } else {
        next(error);
      }
    }
  };
};

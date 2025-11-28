import Boom from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import type { ZodEffects, ZodTypeAny } from "zod/v3";

export function validate<T extends ZodTypeAny>(
  schema: ZodObject | ZodEffects<T>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Im running");
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
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
}

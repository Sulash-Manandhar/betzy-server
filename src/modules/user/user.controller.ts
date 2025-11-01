import Boom from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";

const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw Boom.conflict("Failed to load database", {
        error: "Generic",
      });
      res.status(200).json({ message: "Hello World!" });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;

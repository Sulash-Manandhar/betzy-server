import type { CustomPaths, CreateRouterAndSwaggerOptions } from "@/core/types";
import isAdmin from "@/middleware/isAdmin";
import { getRouteType } from "@/utils/routeType";
import { getSwaggerOption } from "@/utils/swaggerInit";
import { requireAuth } from "@clerk/express";
import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const defaultValidator = (req: Request, res: Response, next: NextFunction) =>
  next();

export function createRouterWithSwagger({
  routes,
  app,
}: CreateRouterAndSwaggerOptions) {
  const router = Router();

  const swaggerPaths: Record<string, CustomPaths> = {};

  routes.forEach((route) => {
    const {
      url,
      type,
      method,
      handler,
      description,
      parameters = [],
      tags = [],
      responses = {
        200: {
          description: "Success",
        },
      },
      validator = defaultValidator,
    } = route;

    const urlWithType = getRouteType(type, url);

    swaggerPaths[urlWithType] = {
      [method]: {
        summary: `${type.toUpperCase()}: ${description}`,
        tags: tags,
        parameters,
        responses,
      },
    };

    switch (type) {
      case "admin":
        return router[method](
          urlWithType,
          requireAuth(),
          isAdmin,
          validator,
          handler
        );
      case "protected":
        return router[method](urlWithType, requireAuth(), validator, handler);
      case "public":
        return router[method](urlWithType, validator, handler);
      default:
        return router[method](urlWithType, validator, handler);
    }
  });

  const swaggerOptions = getSwaggerOption(swaggerPaths);
  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
    })
  );

  app.use("/", router);
}

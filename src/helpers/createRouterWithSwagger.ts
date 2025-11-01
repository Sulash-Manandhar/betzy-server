import type { CustomPaths, RouteOptions } from "@/core/types";
import isAdmin from "@/middleware/isAdmin";
import { getRouteType } from "@/utils/routeType";
import { getSwaggerOption } from "@/utils/swaggerInit";
import { requireAuth } from "@clerk/express";
import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function createRouterWithSwagger({ routes, app }: RouteOptions) {
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
        return router[method](urlWithType, requireAuth(), isAdmin, handler);
      case "protected":
        return router[method](urlWithType, requireAuth(), handler);
      case "public":
        return router[method](urlWithType, handler);
      default:
        return router[method](urlWithType, handler);
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

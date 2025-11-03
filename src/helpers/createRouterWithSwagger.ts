import { env } from "@/config/env";
import { logger } from "@/config/logger";
import type { CreateRouterAndSwaggerOptions, CustomPaths } from "@/core/types";
import isAdmin from "@/middleware/isAdmin";
import { validate } from "@/middleware/validator";
import { getRouteType } from "@/utils/routeType";
import { getSwaggerOption } from "@/utils/swaggerInit";
import { requireAuth } from "@clerk/express";
import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import z from "zod";

const defaultSchema = z.object({});

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
      schema = defaultSchema,
    } = route;

    const urlWithType = getRouteType(type, url);

    swaggerPaths[`${urlWithType} ${method}`] = {
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
          validate(schema),
          handler
        );
      case "protected":
        return router[method](
          urlWithType,
          requireAuth(),
          validate(schema),
          handler
        );
      case "public":
        return router[method](urlWithType, validate(schema), handler);
      default:
        return router[method](urlWithType, validate(schema), handler);
    }
  });

  const swaggerOptions = getSwaggerOption(swaggerPaths);

  if (env.ENABLE_ROUTE_LOGGER) {
    logger.info("---AVAILABLE ROUTES---");
    Object.entries(swaggerPaths).forEach(([urlWithType, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        logger.info(
          `[${details.tags[0].toUpperCase()}] ${method.toUpperCase()} ${urlWithType}`
        );
      });
    });
    logger.warn("---END OF THE ROUTE---");
  }
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

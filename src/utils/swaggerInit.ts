import { env } from "@/config/env";
import type { CustomPaths } from "@/core/types";
import type swaggerJSDoc from "swagger-jsdoc";

export function getSwaggerOption(
  paths: Record<string, CustomPaths>
): swaggerJSDoc.OAS3Options {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Betzy API Documentation",
        description: "Betzy API documentation",
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: "Development Server",
        },
      ],
      basePath: "/api",
      paths: paths,
    },
    apis: ["./src/routes/*.ts"],
  };
}

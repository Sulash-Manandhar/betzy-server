import type { Application, NextFunction, Request, Response } from "express";
import type { PathItem } from "swagger-jsdoc";

export type RouteType = "public" | "admin" | "protected";
export type MethodType = "get" | "post" | "put" | "delete" | "patch";

export type Route = {
  url: string;
  type: RouteType;
  method: MethodType;
  description: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  tags?: Array<string>;
  parameters?: CustomParameter;
  responses?: {
    [k: number]: {
      description: string;
    };
  };
};

export type RouteOptions = {
  app: Application;
  routes: Array<Route>;
};

export type CustomPaths = {
  [key: string]: CustomPathItem;
};
export type CustomParameter = Array<{
  in: "body" | "query" | "header";
  name: string;
  required?: boolean;
  description?: string;
  schema?: {
    type?: string | number | boolean | object | undefined;
    enum?: string[] | number[];
    items?: Record<string, any>;
  };
  allowEmptyValue?: boolean;
}>;

export type CustomPathItem = Omit<PathItem, "parameters"> & {
  parameters?: CustomParameter;
  responses?: {};
  requestBody?: {};
};

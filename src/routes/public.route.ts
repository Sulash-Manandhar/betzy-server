import type { Route } from "@/core/types";

export const publicRoutes: Route[] = [
  {
    url: "/user",
    type: "public",
    method: "get",
    description: "Get all users",
    tags: ["User"],
    handler: (req, res) => {
      res.json({ message: "Hello World!" });
    },
  },
  {
    url: "/book",
    type: "admin",
    method: "get",
    description: "Get all Book",
    tags: ["Book"],
    handler: (req, res) => {
      res.json({ message: "Hello Book!" });
    },
  },
  {
    url: "/posts",
    type: "protected",
    method: "get",
    description: "Get all Posts!",
    tags: ["Posts"],
    handler: (req, res) => {
      res.json({ message: "Hello Posts!" });
    },
  },
];

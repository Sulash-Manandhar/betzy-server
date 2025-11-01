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
];

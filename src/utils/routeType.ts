import type { RouteType } from "@/core/types";

export function getRouteType(type: RouteType, url: string) {
  return type === "public" ? `/api${url}` : `/api/${type}${url}`;
}

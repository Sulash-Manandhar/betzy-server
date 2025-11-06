import type { NotificationType } from "prisma/generated/prisma/enums";
import { SortOrder } from "prisma/generated/prisma/internal/prismaNamespace";

export const FILE_UPLOAD_DESTINATION = "./public/uploads";
export const SIGN_UP_BONUS = 2;
export const DEFAULT_MEMBERSHIP_ID = 1;

export const DEFAULT_TIMEZONE = "UTC";
export const DEFAULT_LIMIT = 20;
export const DEFAULT_PAGE = 1;

export const ORDER_BY_TYPE: SortOrder[] = ["asc", "desc"];

export const DEFAULT_ORDER_BY: SortOrder = "asc";

export const NOTIFICATION_TYPES: NotificationType[] = ["PAYMENT_INITIATED"];

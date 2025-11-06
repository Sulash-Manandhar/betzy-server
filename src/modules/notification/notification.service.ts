import { paginationMeta } from "@/utils/paginationMeta";
import notificationRepo from "./notification.repo";
import type {
  CreateNotification,
  FindAllNotification,
} from "./notification.schema";

const notificationService = {
  create: async (payload: CreateNotification["body"]) => {
    try {
      await notificationRepo.create(payload);
      return {
        message: "OK",
      };
    } catch (error) {
      throw error;
    }
  },
  findAll: async (query: FindAllNotification["query"]) => {
    try {
      const [notifications, count] = await notificationRepo.findAll(query);
      return {
        meta: paginationMeta({
          currentPage: query.page,
          limit: query.limit,
          totalCount: count,
        }),
        list: notifications,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default notificationService;

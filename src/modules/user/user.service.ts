import { paginationMeta } from "@/utils/paginationMeta";
import userRepo from "./user.repo";
import type { FindAllUser } from "./user.schema";
import { authRepo } from "../auth/auth.repo";
import { Boom } from "@/utils/packages";

const userService = {
  findById: async (id: number) => {
    try {
      const user = await userRepo.findOneById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  findAll: async (query: FindAllUser["query"]) => {
    try {
      const [user, count] = await userRepo.findAll(query);
      return {
        meta: paginationMeta({
          currentPage: query.page,
          limit: query.limit,
          totalCount: count,
        }),
        list: user,
      };
    } catch (error) {
      throw error;
    }
  },
  getUserPoints: async (clerkId: string) => {
    try {
      const user = await authRepo.findUserByClerkId(clerkId);
      if (!user) {
        throw Boom.badRequest("User not found");
      }
      return {
        xp: user.xp,
        balance: user.balance,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default userService;

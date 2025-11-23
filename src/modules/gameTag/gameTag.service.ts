import { PrismaClientKnownRequestError } from "prisma/generated/prisma/internal/prismaNamespace";
import gameTagRepo from "./gameTag.repo";
import type {
  CreateGameTag,
  FindAllGameTag,
  UpdateGameTag,
} from "./gameTag.schema";
import { Boom } from "@/utils/packages";
import { paginationMeta } from "@/utils/paginationMeta";
import { authRepo } from "../auth/auth.repo";

const gameTagService = {
  create: async (userId: number, payload: CreateGameTag["body"]) => {
    try {
      const game = await gameTagRepo.create(userId, payload);
      return {
        message: "Successfully assigned new game tag",
        data: game,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, payload: UpdateGameTag["body"]) => {
    try {
      const game = await gameTagRepo.update(id, payload);
      return {
        message: "Successfully updated game tag",
        data: game,
        success: true,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (
          error?.meta &&
          error?.meta?.target === "UserGameTag_gameId_gameTag_key"
        ) {
          throw Boom.conflict("GameTag has already been registered.", [
            {
              code: "invalid_type",
              expected: "duplicate gameTag",
              received: "duplicate gameTag",
              path: ["gameTag"],
              message: '"GameTag" is already registered.',
            },
          ]);
        }
      }
      throw error;
    }
  },
  destroy: async (id: number) => {
    try {
      await gameTagRepo.destroy(id);
      return {
        message: "Successfully deleted game tag",
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number) => {
    try {
      const game = await gameTagRepo.findById(id);
      return game;
    } catch (error) {
      throw error;
    }
  },
  findAll: async (userId: number, query: FindAllGameTag["query"]) => {
    try {
      const [gameTags, count] = await gameTagRepo.findAll(userId, query);
      const meta = paginationMeta({
        currentPage: query.page,
        limit: query.limit,
        totalCount: count,
      });
      return { meta, list: gameTags };
    } catch (error) {
      throw error;
    }
  },
  findGameTagByUserIdAndGameId: async (clerkId: string, gameId: number) => {
    try {
      const user = await authRepo.findUserByClerkId(clerkId);
      if (!user) {
        throw new Error("User not found");
      }
      const game = await gameTagRepo.findGameTagByUserIdAndGameId(
        user.id,
        gameId
      );
      return game;
    } catch (error) {
      throw error;
    }
  },
};

export default gameTagService;

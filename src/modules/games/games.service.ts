import { paginationMeta } from "@/utils/paginationMeta";
import gamesRepo from "./games.repo";
import type {
  CreateGamePayload,
  FindAllGamePayload,
  UpdateGamePayload,
} from "./games.schema";

const gamesService = {
  create: async (payload: CreateGamePayload) => {
    try {
      const game = await gamesRepo.create(payload);
      return {
        message: "Successfully added a new game",
        success: true,
        data: game,
      };
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, payload: UpdateGamePayload) => {
    try {
      const game = await gamesRepo.update(id, payload);
      return {
        message: "Successfully updated a game",
        success: true,
        data: game,
      };
    } catch (error) {
      throw error;
    }
  },

  destroy: async (id: number) => {
    try {
      const game = await gamesRepo.destroy(id);
      return {
        message: `Successfully deleted ${game.name} (${game.id})`,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number) => {
    try {
      const game = await gamesRepo.findOne(id);
      return game;
    } catch (error) {
      throw error;
    }
  },
  findAll: async (query: FindAllGamePayload) => {
    try {
      const [games, count] = await gamesRepo.findAll(query);
      const meta = paginationMeta({
        currentPage: query.page,
        limit: query.limit,
        totalCount: count,
      });
      return { meta, list: games };
    } catch (error) {
      throw error;
    }
  },
};

export default gamesService;

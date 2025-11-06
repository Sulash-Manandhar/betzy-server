import { paginationMeta } from "@/utils/paginationMeta";
import membershipRepo from "./membership.repo";
import type {
  CurrentMembershipResponse,
  FindAllMembership,
} from "./membership.schema";

const membershipService = {
  findAll: async (query: FindAllMembership["query"]) => {
    try {
      const [membership, count] = await membershipRepo.findAll(query);
      const meta = paginationMeta({
        currentPage: query.page,
        limit: query.limit,
        totalCount: count,
      });
      return { meta, list: membership };
    } catch (error) {
      throw error;
    }
  },
  currentMembership: async (clerkId: string) => {
    const currentMembership = await membershipRepo.currentMembership(clerkId);
    if (!currentMembership) {
      throw new Error("Membership not found");
    }
    let newResponse: CurrentMembershipResponse = {
      id: currentMembership.id,
      balance: currentMembership.balance || 0,
      xp: currentMembership.xp || 0,
      membership: currentMembership.membership || null,
      nextMembership: null,
      previousMembership: null,
    };
    if (currentMembership.membership) {
      const nextMembership = await membershipRepo.nextMembership(
        currentMembership.membership.ordering
      );
      newResponse = {
        ...newResponse,
        nextMembership: nextMembership,
      };
    }
    if (currentMembership.membership) {
      const previousMembership = await membershipRepo.previousMembership(
        currentMembership.membership.ordering
      );
      newResponse = {
        ...newResponse,
        previousMembership: previousMembership,
      };
    }
    return newResponse;
  },
};

export default membershipService;

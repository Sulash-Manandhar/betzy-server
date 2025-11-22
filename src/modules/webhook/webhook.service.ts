import type { DeletedObjectJSON, UserJSON } from "@clerk/express";
import { referralService } from "../referral/referral.service";
import { webhookRepo } from "./webhook.repo";

const webhookService = {
  createUser: async (data: UserJSON) => {
    try {
      const newCode = await referralService.generate();
      await webhookRepo.create({
        ...data,
        referralCode: newCode,
        membershipId: 1,
      });
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (data: UserJSON) => {
    try {
      await webhookRepo.update(data);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async ({ id }: DeletedObjectJSON) => {
    try {
      if (!id) return;
      await webhookRepo.destroy(id);
      return;
    } catch (error) {
      throw error;
    }
  },
};

export default webhookService;

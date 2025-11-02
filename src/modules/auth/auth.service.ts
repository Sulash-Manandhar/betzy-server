import {
  DEFAULT_MEMBERSHIP_ID,
  DEFAULT_TIMEZONE,
  SIGN_UP_BONUS,
} from "@/core/constant";
import { referralService } from "../referral/referral.service";
import { authRepo } from "./auth.repo";
import type { CreateUserPayload } from "./auth.schema";

export const authService = {
  clerkCreate: async (payload: CreateUserPayload) => {
    try {
      const newCode = await referralService.generate();
      const response = await authRepo.findUserByClerkId(payload.clerkId);
      if (response) {
        const newUserInfo: any = {
          firstName: payload.firstName ?? response.firstName,
          lastName: payload.lastName ?? response.lastName,
          email: payload.email ?? response.email,
          timezone: payload.timezone ?? response.timezone ?? DEFAULT_TIMEZONE,
          clerkId: payload.clerkId,
          profileUrl: payload.profileUrl ?? response.profileUrl,
        };
        const updatedUser = await authRepo.update(newUserInfo);
        return updatedUser;
      }
      const user = await authRepo.create({
        ...payload,
        //TODO: UNCOMMENT THIS LINE
        // membershipId:  DEFAULT_MEMBERSHIP_ID,
        balance: SIGN_UP_BONUS,
        referralCode: newCode,
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
};

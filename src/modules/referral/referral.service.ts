import dayjs from "dayjs";
import {
  generate as generateReferralCode,
  charset,
  Charset,
} from "referral-codes";
import { referralRepo } from "./referral.repo";
import Boom from "@hapi/boom";
import { authRepo } from "../auth/auth.repo";
import type {
  FindAllReferralByReferralId,
  ValidateReferralCode,
} from "./referral.schema";
import { paginationMeta } from "@/utils/paginationMeta";

export const referralService = {
  generate: async () => {
    try {
      const currentYear = dayjs().year();
      const maxAttempts = 10;
      let attempts = 0;

      while (attempts < maxAttempts) {
        const code = generateReferralCode({
          count: 1,
          length: 10,
          charset: charset(Charset.ALPHANUMERIC),
          postfix: `-${currentYear}`,
        })[0];

        if (code) {
          const user = await referralRepo.findByReferralCode(code);
          if (!user) return code;
        }
        attempts++;
      }
      throw Boom.internal(
        "Failed to generate unique referral code after maximum attempts"
      );
    } catch (error) {
      throw Boom.internal(`Error generating referral code: ${error}`);
    }
  },
  validateReferralCode: async ({ code }: ValidateReferralCode["body"]) => {
    try {
      const user = await referralRepo.findByReferralCode(code);
      if (!user) throw Boom.badRequest("Invalid referral code");
      return {
        message: "OK",
      };
    } catch (error) {
      throw error;
    }
  },
  refer: async (
    referralClerkId: string,
    { code }: ValidateReferralCode["body"]
  ) => {
    try {
      const referredUser = await authRepo.findUserByClerkId(referralClerkId);
      if (!referredUser) throw Boom.conflict("Referred User not found");
      const referrerUser = await referralRepo.findByReferralCode(code);
      if (!referrerUser) throw Boom.conflict("Referrer User not found");
      await referralRepo.create(referrerUser.id, referredUser.id, code);
      return {
        message: "OK",
      };
    } catch (error) {
      throw error;
    }
  },
  findAllByReferralId: async (query: FindAllReferralByReferralId["query"]) => {
    try {
      const [list, count] = await referralRepo.findAllByReferralId(
        query.referralId
      );
      return {
        list,
        meta: paginationMeta({
          currentPage: query.page,
          limit: query.limit,
          totalCount: count,
        }),
      };
    } catch (error) {
      throw error;
    }
  },
};

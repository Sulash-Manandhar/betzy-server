import dayjs from "dayjs";
import {
  generate as generateReferralCode,
  charset,
  Charset,
} from "referral-codes";
import { referralRepo } from "./referral.repo";
import Boom from "@hapi/boom";

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
          const user = await referralRepo.findByUser(code);
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
};

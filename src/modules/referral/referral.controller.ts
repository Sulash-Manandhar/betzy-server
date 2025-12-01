import { asyncHandler, asyncValidationHandler } from "@/helpers/asyncHandler";
import type { Request, Response } from "express";
import {
  findAllReferralByReferralId,
  validateReferralCodeSchema,
  type FindAllReferralByReferralId,
  type ValidateReferralCode,
} from "./referral.schema";
import { referralService } from "./referral.service";
import { Boom, HTTPStatusCode } from "@/utils/packages";
import { getAuth } from "@clerk/express";

export const referralController = {
  createReferralCode: asyncValidationHandler<ValidateReferralCode>(
    validateReferralCodeSchema
  )(async (req, res, validated) => {
    const referrerClerkId = getAuth(req)?.userId;
    if (!referrerClerkId) {
      throw Boom.badRequest("User not found, please login again");
    }
    const response = await referralService.refer(
      referrerClerkId,
      validated.body
    );
    res.status(HTTPStatusCode.OK).json(response);
  }),
  validate: asyncValidationHandler<ValidateReferralCode>(
    validateReferralCodeSchema
  )(async (req, res, validate) => {
    const response = await referralService.validateReferralCode(validate.body);
    res.status(HTTPStatusCode.OK).json(response);
  }),
  createRefer: asyncValidationHandler<ValidateReferralCode>(
    validateReferralCodeSchema
  )(async (req, res, validate) => {
    const referredUserClerkId = getAuth(req)?.userId;
    if (!referredUserClerkId) {
      throw Boom.badRequest("User not found, please login again");
    }
    const response = await referralService.refer(
      referredUserClerkId,
      validate.body
    );
    res.status(HTTPStatusCode.OK).json(response);
  }),
  findAllByUserId: asyncValidationHandler<FindAllReferralByReferralId>(
    findAllReferralByReferralId
  )(async (req, res, validated) => {
    console.log(validated);
    const response = await referralService.findAllByReferralId(validated.query);
    res.status(HTTPStatusCode.OK).json(response);
  }),
};

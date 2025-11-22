import { verifyWebhook } from "@clerk/express/webhooks";
import express, { Router } from "express";
import { env } from "@/config/env";
import webhookService from "@/modules/webhook/webhook.service";

const webhookRouter = Router();

webhookRouter.post(
  "/api/webhooks",
  express.raw({ type: "application/json", limit: "10mb" }),
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req, {
        signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
      });

      switch (evt.type) {
        case "user.created":
          webhookService.createUser(evt.data);
          break;
        case "user.deleted":
          webhookService.deleteUser(evt.data);
          break;
        case "user.updated":
          webhookService.updateUser(evt.data);
          break;
        default:
          break;
      }

      return res.status(200).send(`Webhook received: ${evt.type}`);
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).json({
        error: "Error verifying webhook",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

export default webhookRouter;

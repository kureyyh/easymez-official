import express, { Request, Response } from "express";
import { natsWrapper } from "../nats-wrapper";
import { MessageCreatedPublisher } from "../events/publishers/message-created-publisher";
import { NotFoundError, requireAuth } from "@kursat38tr/common";
import { FacebookMessageCreatedListener } from "../events/listeners/facebook-message-created-listener";
import { MessageDoc, Messages } from "../model/message";
import { Chat } from "../model/chat";
import { Client } from "../model/client";
// /
const router = express.Router();

router.post(
  "/api/message",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id, text } = req.body;

    const newDate = JSON.stringify(Date.now());

    const findClient = await Client.findById(id);

    if (!findClient) {
      throw new NotFoundError();
    }

    const findChat = await Chat.findOne({ client: findClient })
      .populate("message")
      .populate("client")
      .populate("organisation");

    if (!findChat) {
      throw new NotFoundError();
    }

    const message = await Messages.build({
      sender: findChat.organisation.organisationId,
      recipient: findChat.client.clientId,
      timestamp: newDate,
      text,
    });
    await message.save();

    const newChat = await Chat.build({
      client: findChat.client,
      organisation: findChat.organisation,
      message: message,
    });
    // /

    await newChat.save();

    res.sendStatus(200);
    new MessageCreatedPublisher(natsWrapper.client).publish({
      sender: findChat.organisation.organisationId,
      recipient: findChat.client.clientId,
      timestamp: newDate,
      text,
    });
  }
);

export { router as postMessageRouter };

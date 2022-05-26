import { Messages } from "../model/message";
import { MessageDetail } from "../model/message-detail";
import { FacebookMessageCreatedPublisher } from "../events/publishers/facebook-message-created-publisher";
import { natsWrapper } from "../nats-wrapper";
// @ts-ignore
import express, { Request } from "express";
const request = require("request");

const router = express.Router();
let webhook_event: {
  message: { mid: any; text: any };
  sender: any;
  recipient: any;
  timestamp: any;
};

router.post("/api/facebook/webhook", async (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry: { messaging: any[] }) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    const messageDetail = MessageDetail.build({
      mid: webhook_event.message.mid,
      text: webhook_event.message.text,
    });
    await messageDetail.save();

    const message = Messages.build({
      sender: webhook_event.sender.id,
      recipient: webhook_event.recipient.id,
      timestamp: webhook_event.timestamp,
      messageDetail,
    });
    await message.save();

    // Publish new event
    new FacebookMessageCreatedPublisher(natsWrapper.client).publish({
      sender: webhook_event.sender.id,
      recipient: webhook_event.recipient.id,
      timestamp: webhook_event.timestamp,
      text: webhook_event.message.text,
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("event received");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

export { router as postWebhook };

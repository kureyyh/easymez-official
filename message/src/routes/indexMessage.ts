import express, { Request, Response } from "express";
import { Messages } from "../model/message";
import { currentUser, requireAuth } from "@kursat38tr/common";
import { Chat } from "../model/chat";
import { Client } from "../model/client";
import { Message } from "node-nats-streaming";
// const keycloak = require("../config/keycloak-config.js").getKeycloak();

const router = express.Router();

router.get("/api/message", async (req: Request, res: Response) => {
  const messages = await Messages.find();
  res.send({
    messages,
  });
});

export { router as indexMessageRouter };

import express, { Request, Response } from "express";
import { Messages } from "../model/message";
import { currentUser, requireAuth } from "@kursat38tr/common";
import { Chat } from "../model/chat";
// const keycloak = require("../config/keycloak-config.js").getKeycloak();

const router = express.Router();

router.get("/api/message/chat", async (req: Request, res: Response) => {
  const chat = await Chat.find()
    .populate("client")
    .populate("organisation")
    .populate("message");
  res.send({ chat });
});

export { router as indexChatRouter };

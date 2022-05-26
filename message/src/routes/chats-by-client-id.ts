import express, { Request, Response } from "express";
import { Messages } from "../model/message";
import { currentUser, NotFoundError, requireAuth } from "@kursat38tr/common";
import { Chat } from "../model/chat";
import { Client } from "../model/client";
// const keycloak = require("../config/keycloak-config.js").getKeycloak();

const router = express.Router();

router.get(
  "/api/message/chat/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const client = await Client.findById(req.params.id);

    if (!client) {
      throw new NotFoundError();
    }

    const chat = await Chat.find({ client: client })
      .populate("client")
      .populate("organisation")
      .populate("message");

    res.send(chat);
  }
);

export { router as showChatByClientRouter };
// router.get("/api/message/chat/:id", async (req: Request, res: Response) => {
//     const clientId = req.params.id;
//
//     const findClient = await Client.findById(clientId);
//
//     if (!findClient) {
//         throw new NotFoundError();
//     }
//     const chat = await Chat.find({ client: findClient });
//     res.send(chat);
// });

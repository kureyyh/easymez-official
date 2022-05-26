import express, { Request, Response } from "express";
import { Messages } from "../model/message";
import { currentUser, requireAuth } from "@kursat38tr/common";
import { Chat } from "../model/chat";
import { Client } from "../model/client";
// const keycloak = require("../config/keycloak-config.js").getKeycloak();

const router = express.Router();

router.get(
  "/api/message/client",
  requireAuth,
  async (req: Request, res: Response) => {
    const clients = await Client.find();
    res.send(clients);
  }
);

export { router as indexClientRouter };

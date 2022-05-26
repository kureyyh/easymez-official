import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@kursat38tr/common";
import { Messages } from "../model/message";
import { Chat } from "../model/chat";
import { Client } from "../model/client";

const router = express.Router();
router.get("/api/message/client/:id", async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const client = await Client.findById(clientId);

  if (!client) {
    throw new NotFoundError();
  }

  res.send(client);
});

export { router as showClientRouter };

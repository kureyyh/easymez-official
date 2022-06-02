import { Request, Response } from "express";

const express = require("express");
const bodyParser = require("body-parser");
import { getWebhook } from "./routes/get";
import { postWebhook } from "./routes/post";

const app = express().use(bodyParser.json()); // creates express http server
app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));

// app.use(getWebhook);
app.use(postWebhook);

app.get("/api/facebook/welcome", (req: Request, res: Response) => {
  res.send("Hi there!");
});

export { app };

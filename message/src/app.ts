import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@kursat38tr/common";

import { showMessageRouter } from "./routes/show";
import { postMessageRouter } from "./routes/post";
import { indexClientRouter } from "./routes/indexClient";
import { indexMessageRouter } from "./routes/indexMessage";
import { indexChatRouter } from "./routes";
import { showClientRouter } from "./routes/showClient";
import { showChatByClientRouter } from "./routes/chats-by-client-id";

// Test

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// app.use(keycloak.middleware());

app.use(currentUser);
app.use(indexChatRouter);
app.use(indexClientRouter);
app.use(indexMessageRouter);
app.use(showMessageRouter);
app.use(postMessageRouter);
app.use(showClientRouter);
app.use(showChatByClientRouter);
//

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

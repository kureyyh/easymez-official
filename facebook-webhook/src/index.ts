import { app } from "./app";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { natsWrapper } from "./nats-wrapper";
import { MessageCreatedListener } from "./events/listen/message-created-listener";

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    // await natsWrapper.connect("easymez", "asdf", "http://nats-srv:4222");
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("Nats connection closed");
      process.exit();
    });

    new MessageCreatedListener(natsWrapper.client).listen();

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(
      "mongodb+srv://kureyyh:kureyyh@cluster.xtgxe.mongodb.net/cluster?retryWrites=true&w=majority"
    );
    console.log("Connected!");
  } catch (err) {
    console.error(err);
  }

  app.get("/api/facebook/welcome", (req: Request, res: Response) => {
    res.send("Hi there!");
  });
};
//
start();

// import { app } from "./app";
// // @ts-ignore
// import mongoose from "mongoose";
// import { Request, Response } from "express";
// import { natsWrapper } from "./nats-wrapper";
//
// const start = async () => {
//   if (!process.env.NATS_CLIENT_ID) {
//     throw new Error("NATS_CLIENT_ID must be defined");
//   }
//
//   if (!process.env.NATS_URL) {
//     throw new Error("NATS_URL must be defined");
//   }
//
//   if (!process.env.NATS_CLUSTER_ID) {
//     throw new Error("NATS_CLUSTER_ID must be defined");
//   }
//
//   try {
//     await natsWrapper.connect(
//       process.env.NATS_CLIENT_ID,
//       process.env.NATS_URL,
//       process.env.NATS_CLUSTER_ID
//     );
//
//     natsWrapper.client.on("close", () => {
//       console.log("Nats connection closed");
//       process.exit();
//     });
//
//     process.on("SIGINT", () => natsWrapper.client.close());
//     process.on("SIGTERM", () => natsWrapper.client.close());
//
//     await mongoose.connect(
//       "mongodb+srv://kureyyh:kureyyh@cluster.xtgxe.mongodb.net/cluster?retryWrites=true&w=majority"
//     );
//     console.log("Connected!");
//   } catch (err) {
//     console.error(err);
//   }
//
//   app.get("/api/facebook/welcome", (req: Request, res: Response) => {
//     res.send("Hi there!");
//   });
// };
//
// start();

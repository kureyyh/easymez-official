import { Listener, MessageCreatedEvent, Subjects } from "@kursat38tr/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Messages } from "../../model/message";
import { MessageDetail } from "../../model/message-detail";
// import express, { Request } from "express";
const request = require("request");

export class MessageCreatedListener extends Listener<MessageCreatedEvent> {
  subject: Subjects.MessageCreated = Subjects.MessageCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: MessageCreatedEvent["data"], msg: Message) {
    console.log(data);

    await handleMessage(data.recipient, data.text);
    // await callSendAPI("4874164466029745", data.messageDetail.text);
    //
    msg.ack();
  }
}

function handleMessage(sender_psid: any, received_message: any) {
  let response;

  // Check if the message contains text
  if (received_message) {
    // Create the payload for a basic text message
    response = {
      text: received_message,
    };
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_id: any, response: any) {
  const accessToken =
    "EAAFpJAAl7E0BANZBDkUXfAIMfUNA4qLUqZBxbI28KtuwvGvv3ji02j0v0MPxZCWV9UMAbiU2WonIbMOIcPS9Wdh2pJxL5kprkOkGZAqXhOyQzIgCA5l9ZAbdy60exWDIct7Vqg6UnkvRT18II9GnroOhgKoMrZAiBPdttY912EwAMT5wtPV6Hv";

  // Construct the message body
  let request_body = {
    recipient: {
      id: JSON.parse(sender_id),
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: accessToken },
      method: "POST",
      json: request_body,
    },
    (err: Error, res: Request, body: Body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

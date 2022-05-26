import {
  FacebookMessageCreatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@kursat38tr/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Messages } from "../../model/message";
import { Client, ClientDoc, ClientSchema } from "../../model/client";
import { Organisation, OrganisationDoc } from "../../model/organisation";
import { Chat } from "../../model/chat";

let organisation: OrganisationDoc;
let client: ClientDoc;

export class FacebookMessageCreatedListener extends Listener<FacebookMessageCreatedEvent> {
  subject: Subjects.FacebookMessageCreated = Subjects.FacebookMessageCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FacebookMessageCreatedEvent["data"], msg: Message) {
    console.log(data);

    const findClient = await Client.findOne({ clientId: data.sender });

    if (!findClient) {
      client = await Client.build({
        clientId: data.sender,
      });
      client.save();
    } else {
      client = findClient;
    }

    const findOrganisation = await Organisation.findOne({
      organisationId: data.recipient,
    });

    if (!findOrganisation) {
      organisation = await Organisation.build({
        organisationId: data.recipient,
      });
      organisation.save();
    } else {
      organisation = findOrganisation;
    }

    // Create Message
    const message = await Messages.build({
      sender: data.sender,
      recipient: data.recipient,
      timestamp: data.timestamp,
      text: data.text,
    });
    await message.save();

    const newChat = Chat.build({
      client,
      organisation,
      message,
    });

    await newChat.save();

    msg.ack();
  }
}

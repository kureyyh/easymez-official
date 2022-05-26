import { FacebookMessageCreatedListener } from "../facebook-message-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { FacebookMessageCreatedEvent } from "@kursat38tr/common";
import { Message } from "node-nats-streaming";
import { Messages } from "../../../model/message";
import { Chat } from "../../../model/chat";

const setup = async () => {
  // create an instance of listener
  const listener = new FacebookMessageCreatedListener(natsWrapper.client);
  // create a fake data event

  const data: FacebookMessageCreatedEvent["data"] = {
    sender: "4874164466029745",
    recipient: "101274132562842",
    timestamp: "1652925426923",
    text: "This is a test",
  };
  // create a fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a facebook message", async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object
  await listener.onMessage(data, msg);
  // write assertion to make sure a facebook message is created

  const message = await Messages.findOne({ sender: data.sender });

  expect(message).toBeDefined();
  expect(message!.sender).toEqual(data.sender);
  expect(message!.recipient).toEqual(data.recipient);
  expect(message!.timestamp).toEqual(data.timestamp);
  expect(message!.text).toEqual(data.text);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object

  await listener.onMessage(data, msg);
  // write assertions that ack function is called

  expect(msg.ack).toHaveBeenCalled();
});

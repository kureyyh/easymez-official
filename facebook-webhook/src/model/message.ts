import mongoose from "mongoose";
import { MessageDetailDoc, messageDetailSchema } from "./message-detail";

interface MessageAttrs {
  sender: string;
  recipient: string;
  timestamp: string;
  messageDetail: MessageDetailDoc;
}

export interface MessageDoc extends mongoose.Document {
  sender: string;
  recipient: string;
  timestamp: string;
  messageDetail: MessageDetailDoc;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    recipient: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    messageDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageDetail",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Messages(attrs);
};

const Messages = mongoose.model<MessageDoc, MessageModel>(
  "Messages",
  messageSchema
);

export { Messages };

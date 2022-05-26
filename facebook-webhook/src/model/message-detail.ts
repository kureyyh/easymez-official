import mongoose from "mongoose";

interface MessageDetailAttrs {
  mid: string;
  text: string;
}

export interface MessageDetailDoc extends mongoose.Document {
  mid: string;
  text: string;
}

interface MessageDetailModel extends mongoose.Model<MessageDetailDoc> {
  build(attrs: MessageDetailAttrs): MessageDetailDoc;
}

const messageDetailSchema = new mongoose.Schema(
  {
    mid: {
      type: String,
    },
    text: {
      type: String,
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

messageDetailSchema.statics.build = (attrs: MessageDetailAttrs) => {
  return new MessageDetail(attrs);
};

const MessageDetail = mongoose.model<MessageDetailDoc, MessageDetailModel>(
  "MessageDetail",
  messageDetailSchema
);

export { MessageDetail, messageDetailSchema };

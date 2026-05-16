import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "character"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    previousMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    edited: {
      type: Boolean,
      default: false,
    },

    regenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model(
  "Message",
  MessageSchema
);
import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
  {
    characterId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Conversation",
    },

    parentConversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },

    branchFromMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.model(
  "Conversation",
  ConversationSchema
);
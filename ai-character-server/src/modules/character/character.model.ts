import mongoose, { Schema } from "mongoose";

const CharacterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    tagline: {
      type: String,
      default: "",
    },

    personality: {
      type: String,
      default: "",
    },

    background: {
      type: String,
      default: "",
    },

    emotionalBoundaries: {
      type: String,
      default: "",
    },

    speechStyle: {
      type: String,
      default: "",
    },

    relationshipStyle: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const CharacterModel = mongoose.model(
  "Character",
  CharacterSchema
);
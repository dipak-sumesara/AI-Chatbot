import { Request, Response } from "express";

import * as MessageService from "./message.service";

import { CharacterModel } from "../character/character.model";

import { ConversationModel } from "../conversation/conversation.model";

import { generateCharacterReply } from "../ai/ai.service";

export const createMessage = async (
  req: Request,
  res: Response
) => {
  try {
    // Save user message
    const userMessage =
      await MessageService.createMessage(
        req.body
      );

    // Get conversation
    const conversation =
      await ConversationModel.findById(
        req.body.conversationId
      );

    if (!conversation) {
      throw new Error(
        "Conversation not found"
      );
    }

    // Get character
    const character =
      await CharacterModel.findById(
        conversation.characterId
      );

    if (!character) {
      throw new Error(
        "Character not found"
      );
    }

    // Get recent messages
    const messages =
      await MessageService.getMessagesByConversation(
        req.body.conversationId
      );

    // Generate AI response
    const aiReply =
      await generateCharacterReply({
        character,

        messages,

        latestUserMessage:
          req.body.content,
      });

    // Save AI message
    const aiMessage =
      await MessageService.createMessage({
        conversationId:
          req.body.conversationId,

        sender: "character",

        content: aiReply,
      });

    res.status(201).json({
      success: true,

      message:
        "Messages created successfully",

      data: {
        userMessage,
        aiMessage,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Failed to create message",
    });
  }
};

export const getMessagesByConversation =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const messages =
        await MessageService.getMessagesByConversation(
          req.params.conversationId as string
        );

      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch messages",
      });
    }
  };

export const updateMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const message =
      await MessageService.updateMessage(
        req.params.messageId as string,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Message updated successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to update message",
    });
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
) => {
  try {
    await MessageService.deleteMessage(
      req.params.messageId as string
    );

    res.status(200).json({
      success: true,
      message:
        "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete message",
    });
  }
};

export const rewindConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await MessageService.rewindConversation(
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Conversation rewound successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to rewind conversation",
    });
  }
};

export const regenerateMessage =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        conversationId,
      } = req.body;

      const messages =
        await MessageService.getMessagesByConversation(
          conversationId
        );

      const lastUserMessage =
        [...messages]
          .reverse()
          .find(
            (message) =>
              message.sender ===
              "user"
          );

      if (!lastUserMessage) {
        throw new Error(
          "No user message found"
        );
      }

      const conversation =
        await ConversationModel.findById(
          conversationId
        );

      if (!conversation) {
        throw new Error(
          "Conversation not found"
        );
      }

      const character =
        await CharacterModel.findById(
          conversation.characterId
        );

      if (!character) {
        throw new Error(
          "Character not found"
        );
      }

      // Generate new reply
      const aiReply =
        await generateCharacterReply({
          character,

          messages,

          latestUserMessage:
            lastUserMessage.content,
        });

      // Find latest AI message
      const latestAiMessage =
        [...messages]
          .reverse()
          .find(
            (message) =>
              message.sender ===
              "character"
          );

      if (!latestAiMessage) {
        throw new Error(
          "No AI message found"
        );
      }

      // Replace content
      latestAiMessage.content =
        aiReply;

      await latestAiMessage.save();

      res.status(200).json({
        success: true,

        data: latestAiMessage,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Failed to regenerate response",
      });
    }
  };

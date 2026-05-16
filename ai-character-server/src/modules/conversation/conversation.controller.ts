import { Request, Response } from "express";

import * as ConversationService from "./conversation.service";

export const createConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const conversation =
      await ConversationService.createConversation(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Conversation created successfully",
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to create conversation",
    });
  }
};

export const getConversationsByCharacter =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const conversations =
        await ConversationService.getConversationsByCharacter(
          req.params.characterId as string
        );

      res.status(200).json({
        success: true,
        data: conversations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch conversations",
      });
    }
  };

export const getConversationById = async (
  req: Request,
  res: Response
) => {
  try {
    const conversation =
      await ConversationService.getConversationById(
        req.params.conversationId as string
      );

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch conversation",
    });
  }
};

export const branchConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const conversation =
      await ConversationService.branchConversation(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Conversation branched successfully",
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to branch conversation",
    });
  }
};

export const updateConversationTitle =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const conversation =
        await ConversationService.updateConversationTitle(
          req.params.conversationId as string,
          req.body.title
        );

      res.status(200).json({
        success: true,
        message:
          "Conversation updated successfully",
        data: conversation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to update conversation",
      });
    }
  };
import { ConversationModel } from "./conversation.model";

export const createConversation = async (
  payload: any
) => {
  const conversation =
    await ConversationModel.create({
      ...payload,

      title:
        payload.title ||
        "New Conversation",
    });

  return conversation;
};

export const getConversationsByCharacter =
  async (characterId: string) => {
    const conversations =
      await ConversationModel.find({
        characterId,
      }).sort({
        updatedAt: -1,
      });

    return conversations;
  };

export const getConversationById = async (
  conversationId: string
) => {
  const conversation =
    await ConversationModel.findById(
      conversationId
    );

  return conversation;
};

export const branchConversation = async (
  payload: {
    conversationId: string;
    branchFromMessageId: string;
  }
) => {
  const originalConversation =
    await ConversationModel.findById(
      payload.conversationId
    );

  if (!originalConversation) {
    throw new Error("Conversation not found");
  }

  const branchedConversation =
    await ConversationModel.create({
      characterId:
        originalConversation.characterId,

      title:
        originalConversation.title,

      parentConversationId:
        originalConversation._id,

      branchFromMessageId:
        payload.branchFromMessageId,
    });

  return branchedConversation;
};

export const updateConversationTitle =
  async (
    conversationId: string,
    title: string
  ) => {
    const updatedConversation =
      await ConversationModel.findByIdAndUpdate(
        conversationId,
        {
          title,
        },
        {
          new: true,
        }
      );

    return updatedConversation;
  };
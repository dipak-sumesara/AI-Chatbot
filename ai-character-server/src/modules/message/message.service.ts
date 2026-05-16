import { MessageModel } from "./message.model";

export const createMessage = async (
  payload: any
) => {
  const latestMessage =
    await MessageModel.findOne({
      conversationId:
        payload.conversationId,
    }).sort({
      createdAt: -1,
    });

  const message =
    await MessageModel.create({
      ...payload,
      previousMessageId:
        latestMessage?._id || null,
    });

  return message;
};

export const getMessagesByConversation =
  async (conversationId: string) => {
    const messages =
      await MessageModel.find({
        conversationId,
      }).sort({
        createdAt: 1,
      });

    return messages;
  };

export const updateMessage = async (
  messageId: string,
  payload: any
) => {
  const updatedMessage =
    await MessageModel.findByIdAndUpdate(
      messageId,
      {
        ...payload,
        edited: true,
      },
      {
        new: true,
      }
    );

  return updatedMessage;
};

export const deleteMessage = async (
  messageId: string
) => {
  await MessageModel.findByIdAndDelete(
    messageId
  );

  return;
};

export const rewindConversation = async (
  payload: {
    conversationId: string;
    messageId: string;
  }
) => {
  return {
    rewoundTo: payload.messageId,
  };
};
export interface Conversation {
  _id: string;

  characterId: string;

  title?: string;

  parentConversationId?: string;

  branchFromMessageId?: string;

  createdAt?: string;

  updatedAt?: string;
}
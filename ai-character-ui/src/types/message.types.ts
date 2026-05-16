export interface Message {
  _id: string;

  conversationId: string;

  sender: "user" | "character";

  content: string;

  previousMessageId?: string;

  edited?: boolean;

  regenerated?: boolean;

  createdAt?: string;

  updatedAt?: string;
}
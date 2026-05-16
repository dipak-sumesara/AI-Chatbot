import { useState } from "react";

import { SendHorizonal } from "lucide-react";

import { createMessage } from "../../services/api/message.api";
import { updateConversationTitle } from "../../services/api/conversation.api";

import { type Conversation } from "../../types/conversation.types";
import { type Message } from "../../types/message.types";

type Props = {
  conversation: Conversation | null;

  messages: Message[];

  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;

  setIsTyping: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const ChatInput = ({
  conversation,
  messages,
  setMessages,
  setIsTyping
}: Props) => {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (!conversation?._id) return;

    const messageContent = message;

    // Clear instantly
    setMessage("");

    // Optimistic message
    const optimisticMessage = {
      _id: Date.now().toString(),

      conversationId:
        conversation._id,

      sender: "user" as const,

      content: messageContent,
    };

    // Instantly render message
    setMessages((prev) => [
      ...prev,
      optimisticMessage,
    ]);

    // Show typing instantly
    setIsTyping(true);

    try {
      setLoading(true);

      const response: any =
        await createMessage({
          conversationId:
            conversation._id,

          sender: "user",

          content: messageContent,
        });

      // Append ONLY AI response
      setMessages((prev) => [
        ...prev,
        response.data.aiMessage,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

      setIsTyping(false);
    }
  };

  return (
    <div className="px-8 pb-8 pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-[32px] border border-white/[0.04] bg-white/[0.03] backdrop-blur-2xl px-6 py-5 flex items-center gap-4 shadow-2xl">
          <textarea
            rows={1}
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key.toLowerCase() === "enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Say something emotionally dangerous..."
            className="flex-1 bg-transparent resize-none outline-none text-[15px] leading-7 text-white placeholder:text-white/25"
          />

          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl disabled:opacity-50"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
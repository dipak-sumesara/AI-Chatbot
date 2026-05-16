import React, {
  useEffect,
  useRef,
} from "react";

import { motion } from "framer-motion";

import { RotateCcw } from "lucide-react";

import MessageBubble from "./MessageBubble";

import { type Message } from "../../types/message.types";
import { type Character } from "../../types/character.types";
import type { Conversation } from "../../types/conversation.types";
import { regenerateMessage } from "../../services/api/message.api";

type Props = {
  messages: Message[];

  loading: boolean;

  selectedCharacter: Character | null;

  isTyping: boolean;

  conversation: Conversation | null;

  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;

  setIsTyping: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const ChatWindow = ({
  messages,
  loading,
  selectedCharacter,
  isTyping,
  setIsTyping,
  conversation,
  setMessages
}: Props) => {
  const bottomRef =
    useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: messages.length < 3
        ? "auto"
        : "smooth",
    });
  };

  const handleRegenerate =
    async () => {
      if (!conversation?._id) return;

      try {
        setIsTyping(true);

        const response: any =
          await regenerateMessage(
            conversation._id
          );

        setMessages((prev) => {
          const updated = [...prev];

          const lastAiIndex =
            [...updated]
              .reverse()
              .findIndex(
                (message) =>
                  message.sender ===
                  "character"
              );

          if (
            lastAiIndex === -1
          ) {
            return updated;
          }

          const actualIndex =
            updated.length -
            1 -
            lastAiIndex;

          updated[actualIndex] =
            response.data;

          return updated;
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsTyping(false);
      }
    };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-visible px-8 py-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-white/30">
            loading memories...
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-center"
            >
              <h2 className="text-white/70 text-xl">
                Some conversations begin slowly.
              </h2>

              <p className="text-white/30 mt-3">
                Silence can be intimate too.
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-8 pb-0">
            {messages.map(
              (message, index) => (
                <React.Fragment key={message._id}>
                  <motion.div
                    key={message._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                  >
                    <MessageBubble
                      message={message.content}
                      isUser={
                        message.sender === "user"
                      }
                      characterImage={
                        selectedCharacter?.image
                      }
                    />
                  </motion.div>
                  {index === messages.length - 1 &&
                    message.sender ===
                    "character" && (
                      <div className="mt-3 ml-14">
                        <button
                          onClick={
                            handleRegenerate
                          }
                          className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition"
                        >
                          <RotateCcw size={13} />
                          regenerate
                        </button>
                      </div>
                    )}
                </React.Fragment>
              )
            )}
            {isTyping && (
              <div className="flex items-center gap-3">
                {selectedCharacter?.image ? (
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-white/[0.06]" />
                )}

                <div className="px-5 py-4 rounded-[24px] rounded-bl-[10px] bg-white/[0.05] border border-white/[0.04]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />

                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0.15s]" />

                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
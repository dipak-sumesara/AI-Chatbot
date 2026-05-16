import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const messages = [
    {
      id: 1,
      message:
        "Some nights feel dangerous in a quiet way. Like silence is waiting for someone to say the wrong thing.",
      isUser: false,
    },
    {
      id: 2,
      message: "Or the right thing.",
      isUser: true,
    },
    {
      id: 3,
      message:
        "Maybe that's why people talk so carefully after midnight.",
      isUser: false,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Empty State */}
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
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
          <div className="space-y-8">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
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
                  delay: index * 0.08,
                }}
              >
                <MessageBubble
                  message={msg.message}
                  isUser={msg.isUser}
                />
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
              }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3f3f46] to-[#1c1c1f]" />

              <div className="px-5 py-4 rounded-[28px] rounded-bl-md bg-white/[0.04] border border-white/[0.03] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />

                <div
                  className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                  style={{
                    animationDelay: "0.15s",
                  }}
                />

                <div
                  className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                  style={{
                    animationDelay: "0.3s",
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
import { MessageCircleMore } from "lucide-react";

import { type Conversation } from "../../../types/conversation.types";

type Props = {
  conversations: Conversation[];

  selectedConversation:
    | Conversation
    | null;

  onSelectConversation: (
    conversation: Conversation
  ) => void;
};

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}: Props) => {
  if (conversations.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 ml-5 pl-4 border-l border-white/[0.04] space-y-1">
      {conversations.map(
        (conversation) => (
          <button
            key={conversation._id}
            onClick={() =>
              onSelectConversation(
                conversation
              )
            }
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-300

              ${
                selectedConversation?._id ===
                conversation._id
                  ? "bg-white/[0.06]"
                  : "hover:bg-white/[0.03]"
              }
            `}
          >
            <MessageCircleMore
              size={15}
              className="text-white/25"
            />

            <div className="overflow-hidden">
              <p className="text-sm text-white/70 truncate">
                {conversation.title}
              </p>
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default ConversationList;
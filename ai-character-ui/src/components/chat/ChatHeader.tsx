import { useEffect, useRef, useState } from "react";

import {
  Edit3,
  MessageSquarePlus,
  MoreHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { createConversation } from "../../services/api/conversation.api";

import { type Character } from "../../types/character.types";
import { type Conversation } from "../../types/conversation.types";

type Props = {
  character: Character | null;

  setSelectedConversation: (
    conversation: Conversation
  ) => void;
};

const ChatHeader = ({
  character,
  setSelectedConversation,
}: Props) => {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!character) return null;

  const handleStartNewChat =
    async () => {
      try {
        setLoading(true);

        const response: any =
          await createConversation({
            characterId:
              character._id,
          });

        setSelectedConversation(
          response.data
        );

        setOpen(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <header className="h-[88px] px-8 flex items-center justify-between border-b border-white/[0.04] bg-black/10 backdrop-blur-xl">
      {/* Character */}
      <div className="flex items-center gap-4">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a4a52] to-[#232329]" />
        )}

        <div>
          <h2 className="text-white/90 text-lg font-medium">
            {character.name}
          </h2>

          <p className="text-sm text-white/35 mt-1">
            {character.tagline}
          </p>
        </div>
      </div>

      {/* Menu */}
      <div
        className="relative"
        ref={menuRef}
      >
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="w-11 h-11 rounded-2xl hover:bg-white/[0.05] transition flex items-center justify-center"
        >
          <MoreHorizontal
            size={20}
            className="text-white/50"
          />
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-50 w-[240px] rounded-2xl border border-white/[0.05] bg-[#141416]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">
            {/* Edit */}
            <button
              onClick={() =>
                navigate(
                  `/character/edit/${character._id}`
                )
              }
              className="w-full px-4 py-4 hover:bg-white/[0.04] transition flex items-center gap-3 text-left"
            >
              <Edit3
                size={16}
                className="text-white/40"
              />

              <div>
                <p className="text-sm text-white/80">
                  Edit Character
                </p>

                <p className="text-xs text-white/35 mt-1">
                  adjust personality &
                  details
                </p>
              </div>
            </button>

            {/* New Chat */}
            <button
              onClick={
                handleStartNewChat
              }
              disabled={loading}
              className="w-full px-4 py-4 hover:bg-white/[0.04] transition flex items-center gap-3 text-left disabled:opacity-50"
            >
              <MessageSquarePlus
                size={16}
                className="text-white/40"
              />

              <div>
                <p className="text-sm text-white/80">
                  {loading
                    ? "Creating..."
                    : "Start New Chat"}
                </p>

                <p className="text-xs text-white/35 mt-1">
                  begin another
                  conversation
                </p>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
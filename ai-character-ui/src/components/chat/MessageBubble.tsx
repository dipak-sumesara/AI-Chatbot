import {
  Copy,
  Edit3,
  MoreHorizontal,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { useState } from "react";

type Props = {
  message: string;

  isUser?: boolean;

  characterImage?: string;
};

const formatMessage = (
  text: string,
  isUser = false
) => {
  const parts = text.split(
    /(\*.*?\*)/g
  );

  return parts.map(
    (part, index) => {
      // Narration
      if (
        part.startsWith("*") &&
        part.endsWith("*")
      ) {
        return (
          <span
            key={index}
            className={`italic ${isUser ? "text-black/45" : "text-white/45"}`}
          >
            {part.slice(1, -1)}
          </span>
        );
      }

      // Normal dialogue
      return (
        <span key={index}>
          {part}
        </span>
      );
    }
  );
};

const MessageBubble = ({
  message,
  isUser,
  characterImage,
}: Props) => {
  const [open, setOpen] =
    useState(false);

  return (
    <div
      className={`flex items-end gap-3
      ${isUser
          ? "justify-end"
          : "justify-start"
        }`}
    >
      {/* Character Avatar */}
      {!isUser && (
        <>
          {characterImage ? (
            <img
              src={characterImage}
              alt="character"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3f3f46] to-[#1c1c1f]" />
          )}
        </>
      )}

      {/* Bubble + Menu */}
      <div
        className={`flex items-center gap-2
        ${isUser
            ? "flex-row"
            : "flex-row"
          }`}
      >
        {/* Bubble */}
        <div
          className={`
          px-6 py-5 rounded-[28px]
          max-w-[520px]
          text-[15px]
          leading-7
          backdrop-blur-2xl
          transition-all duration-300

          ${isUser
              ? `
                bg-white
                text-black
                rounded-br-[10px]
              `
              : `
                bg-white/[0.05]
                border border-white/[0.04]
                text-white/90
                rounded-bl-[10px]
              `
            }
        `}
        >

          <div className="whitespace-pre-wrap">
            {formatMessage(message, isUser)}
          </div>
        </div>

        {/* Menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="w-9 h-9 rounded-xl hover:bg-white/[0.05] transition flex items-center justify-center"
          >
            <MoreHorizontal
              size={16}
              className="text-white/30"
            />
          </button>

          {open && (
            <div
              className={`
              absolute top-10 z-50 w-[220px]
              rounded-2xl
              border border-white/[0.05]
              bg-[#141416]/95
              backdrop-blur-2xl
              overflow-hidden
              shadow-[0_20px_80px_rgba(0,0,0,0.45)]

              ${isUser
                  ? "right-0"
                  : "left-0"
                }
            `}
            >
              <button className="w-full px-4 py-3 hover:bg-white/[0.04] transition flex items-center gap-3 text-sm text-white/80">
                <Copy size={15} />
                Copy
              </button>

              <button className="w-full px-4 py-3 hover:bg-white/[0.04] transition flex items-center gap-3 text-sm text-white/80">
                <Edit3 size={15} />
                Edit
              </button>

              <button className="w-full px-4 py-3 hover:bg-white/[0.04] transition flex items-center gap-3 text-sm text-white/80">
                <RotateCcw size={15} />
                Rewind Here
              </button>

              <button className="w-full px-4 py-3 hover:bg-red-500/10 transition flex items-center gap-3 text-sm text-red-300">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
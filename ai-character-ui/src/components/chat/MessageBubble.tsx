import { useEffect, useRef, useState } from "react";

import {
  Copy,
  Edit3,
  GitBranch,
  MoreHorizontal,
  RotateCcw,
  Trash2,
} from "lucide-react";

type Props = {
  isUser?: boolean;
  message: string;
};

const MessageBubble = ({ isUser, message }: Props) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
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

  const menuItems = [
    {
      icon: Copy,
      label: "Copy Message",
    },
    {
      icon: Edit3,
      label: "Edit Message",
    },
    {
      icon: GitBranch,
      label: "Branch From Here",
    },
    {
      icon: RotateCcw,
      label: "Return To This Moment",
    },
    {
      icon: Trash2,
      label: "Delete Message",
    },
  ];

  return (
    <div
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : ""
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3f3f46] to-[#1c1c1f] shrink-0 shadow-xl" />
      )}

      <div className="relative flex items-center gap-2 max-w-[720px]">
        {/* Left Menu */}
        {!isUser && (
          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-8 h-8 rounded-xl hover:bg-white/[0.05] transition flex items-center justify-center"
            >
              <MoreHorizontal
                size={15}
                className="text-white/35"
              />
            </button>

            {open && (
              <div className="absolute left-0 top-10 z-50 w-[240px] rounded-2xl border border-white/[0.05] bg-[#141416]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-3 hover:bg-white/[0.04] transition flex items-center gap-3 text-left"
                  >
                    <item.icon
                      size={15}
                      className="text-white/40"
                    />

                    <span className="text-sm text-white/75">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-6 py-5 rounded-[30px] text-[15px] leading-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500
          ${
            isUser
              ? "bg-white text-black rounded-br-md"
              : "bg-white/[0.045] border border-white/[0.03] text-white/88 rounded-bl-md hover:bg-white/[0.06]"
          }`}
        >
          {message}
        </div>

        {/* Right Menu */}
        {isUser && (
          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-8 h-8 rounded-xl hover:bg-white/[0.05] transition flex items-center justify-center"
            >
              <MoreHorizontal
                size={15}
                className="text-white/35"
              />
            </button>

            {open && (
              <div className="absolute right-0 top-10 z-50 w-[240px] rounded-2xl border border-white/[0.05] bg-[#141416]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-3 hover:bg-white/[0.04] transition flex items-center gap-3 text-left"
                  >
                    <item.icon
                      size={15}
                      className="text-white/40"
                    />

                    <span className="text-sm text-white/75">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
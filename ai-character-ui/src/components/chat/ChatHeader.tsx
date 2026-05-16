import { useEffect, useRef, useState } from "react";

import {
  Edit3,
  MessageSquarePlus,
  MoreHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();

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

  return (
    <header className="h-[80px] px-8 flex items-center justify-between border-b border-white/[0.04] bg-black/10 backdrop-blur-xl">
      {/* Character */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a4a52] to-[#232329]" />

        <div>
          <h2 className="text-white/90 text-lg font-medium">
            Nancy
          </h2>

          <p className="text-sm text-white/35 mt-1">
            emotionally present tonight
          </p>
        </div>
      </div>

      {/* Menu */}
      <div
        className="relative"
        ref={menuRef}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-11 h-11 rounded-2xl hover:bg-white/[0.05] transition flex items-center justify-center"
        >
          <MoreHorizontal
            size={20}
            className="text-white/50"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 z-50 w-[240px] rounded-2xl border border-white/[0.05] bg-[#141416]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Edit */}
            <button
              onClick={() =>
                navigate("/character/create")
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
                  adjust personality & details
                </p>
              </div>
            </button>

            {/* New Chat */}
            <button className="w-full px-4 py-4 hover:bg-white/[0.04] transition flex items-center gap-3 text-left">
              <MessageSquarePlus
                size={16}
                className="text-white/40"
              />

              <div>
                <p className="text-sm text-white/80">
                  Start New Chat
                </p>

                <p className="text-xs text-white/35 mt-1">
                  begin another conversation
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
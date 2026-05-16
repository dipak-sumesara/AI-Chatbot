import { SendHorizonal } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="px-8 pb-8 pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-[32px] border border-white/[0.04] bg-white/[0.03] backdrop-blur-2xl px-6 py-5 flex items-end gap-4 shadow-2xl">
          <textarea
            rows={1}
            placeholder="Message Nancy..."
            className="flex-1 bg-transparent resize-none outline-none text-[15px] leading-7 text-white placeholder:text-white/25"
          />

          <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
import './App.css'

import {
  Menu,
  Plus,
  MoreHorizontal,
  SendHorizonal,
} from "lucide-react";

function App() {
  return (
    <div className="h-screen w-screen bg-[#0f0f10] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#141416] border-r border-white/5 flex flex-col">
        {/* Top */}
        <div className="h-[64px] px-4 flex items-center justify-between border-b border-white/5">
          <div>
            <h1 className="text-sm font-semibold tracking-wide">
              Reverie
            </h1>
            <p className="text-xs text-white/40">
              Quiet conversations
            </p>
          </div>

          <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
            <Menu size={18} />
          </button>
        </div>

        {/* Create Button */}
        <div className="p-4">
          <button className="w-full h-11 rounded-2xl bg-white text-black text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
            <Plus size={18} />
            Create Character
          </button>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
          {["Nancy", "Rocky", "Elena", "Ava"].map((character) => (
            <button
              key={character}
              className="w-full p-3 rounded-2xl hover:bg-white/5 transition flex items-center gap-3 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-white/10" />

              <div className="flex-1 overflow-hidden">
                <h3 className="text-sm font-medium truncate">
                  {character}
                </h3>

                <p className="text-xs text-white/40 truncate">
                  Last conversation continues here...
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#111214]">
        {/* Header */}
        <header className="h-[64px] border-b border-white/5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-white/10" />

            <div>
              <h2 className="text-sm font-semibold">Nancy</h2>

              <p className="text-xs text-white/40">
                emotionally present
              </p>
            </div>
          </div>

          <button className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition">
            <MoreHorizontal size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Character Message */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />

              <div className="max-w-[75%]">
                <div className="rounded-3xl rounded-tl-md bg-white/5 px-5 py-4">
                  <p className="text-[15px] leading-7 text-white/90">
                    Some nights feel quieter than they should.
                    Like the world is trying not to interrupt
                    your thoughts.
                  </p>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[75%]">
                <div className="rounded-3xl rounded-br-md bg-white text-black px-5 py-4">
                  <p className="text-[15px] leading-7">
                    Maybe silence feels different when someone
                    understands it.
                  </p>
                </div>
              </div>
            </div>

            {/* Character Message */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />

              <div className="max-w-[75%]">
                <div className="rounded-3xl rounded-tl-md bg-white/5 px-5 py-4">
                  <p className="text-[15px] leading-7 text-white/90">
                    That's rare though. Most people rush to fill
                    silence before they even understand it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-5">
          <div className="max-w-3xl mx-auto">
            <div className="min-h-[60px] rounded-3xl bg-white/5 border border-white/5 flex items-end px-5 py-4 gap-3">
              <textarea
                placeholder="Message Nancy..."
                className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-white/30 max-h-[200px]"
                rows={1}
              />

              <button className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 hover:opacity-90 transition">
                <SendHorizonal size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


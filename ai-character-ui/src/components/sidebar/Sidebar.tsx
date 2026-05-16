import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-[300px] bg-black/20 backdrop-blur-2xl border-r border-white/[0.04] flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-[20px] font-semibold tracking-wide text-white/90">
          Reverie
        </h1>

        <p className="text-sm text-white/30 mt-1">
          conversations that linger
        </p>
      </div>

      {/* Create */}
      <div className="px-4">
        <button className="w-full h-12 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] border border-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-white/90"
          onClick={() => navigate("/character/create")}>
          <Plus size={18} />
          Create Character
        </button>
      </div>

      {/* Characters */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-2">
        {
          ["Nancy", "Elena", "Ava", "Sophia"].map(
            (character, index) => (
              <button
                key={character}
                className={`w-full p-3 rounded-[24px] transition-all duration-500 flex items-center gap-4 text-left group
        ${index === 0
                    ? "bg-white/[0.06] shadow-[0_10px_40px_rgba(255,255,255,0.03)]"
                    : "hover:bg-white/[0.04]"
                  }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3f3f46] to-[#1c1c1f]" />

                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border border-black" />
                </div>

                <div className="overflow-hidden">
                  <h3 className="text-sm text-white/90 font-medium">
                    {character}
                  </h3>

                  <p className="text-xs text-white/35 truncate mt-1">
                    emotionally present tonight
                  </p>
                </div>
              </button>
            )
          )
        }
      </div>
    </aside>
  );
};

export default Sidebar;
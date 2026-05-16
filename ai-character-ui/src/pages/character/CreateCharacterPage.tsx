import { ArrowLeft, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCharacterPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#09090a] text-white">
            {/* Ambient */}
            <div className="absolute top-[-200px] left-[15%] w-[500px] h-[500px] rounded-full bg-[#6b2d5c]/10 blur-[140px]" />

            <div className="absolute bottom-[-300px] right-[10%] w-[600px] h-[600px] rounded-full bg-[#2d436b]/10 blur-[160px]" />

            <div className="relative max-w-5xl mx-auto px-8 py-14">
                {/* Back */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-10 flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition"
                >
                    <ArrowLeft size={16} />
                    Back to conversations
                </button>

                {/* Header */}
                <div className="mb-14">
                    <h1 className="text-5xl font-semibold tracking-tight text-white/95">
                        Create Character
                    </h1>

                    <p className="mt-4 text-white/35 text-lg leading-8 max-w-2xl">
                        Build someone emotionally believable. Not just
                        responsive.
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-[320px_1fr] gap-10">
                    {/* Left */}
                    <div>
                        <div className="sticky top-10">
                            <button className="w-full aspect-square rounded-[36px] border border-dashed border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] transition flex flex-col items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-3xl bg-white/[0.05] flex items-center justify-center">
                                    <ImagePlus
                                        size={28}
                                        className="text-white/50"
                                    />
                                </div>

                                <div className="text-center">
                                    <p className="text-white/80 text-sm">
                                        Upload Character Image
                                    </p>

                                    <p className="text-white/30 text-xs mt-2">
                                        portrait, cinematic, intimate
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-8">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-white/40 mb-3">
                                Character Name
                            </label>

                            <input
                                type="text"
                                placeholder="Nancy"
                                className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.04] px-5 outline-none focus:border-white/[0.08] transition"
                            />
                        </div>

                        {/* Tagline */}
                        <div>
                            <label className="block text-sm text-white/40 mb-3">
                                Tagline
                            </label>

                            <input
                                type="text"
                                placeholder="some people stay in your mind longer"
                                className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.04] px-5 outline-none focus:border-white/[0.08] transition"
                            />
                        </div>

                        {/* Personality */}
                        <div>
                            <label className="block text-sm text-white/40 mb-3">
                                Personality
                            </label>

                            <textarea
                                rows={6}
                                placeholder="emotionally intelligent, playful when comfortable, avoids shallow intimacy..."
                                className="w-full rounded-3xl bg-white/[0.03] border border-white/[0.04] px-5 py-4 outline-none resize-none leading-8 focus:border-white/[0.08] transition"
                            />
                        </div>

                        {/* Background */}
                        <div>
                            <label className="block text-sm text-white/40 mb-3">
                                Background & History
                            </label>

                            <textarea
                                rows={8}
                                placeholder="who are they before meeting the user?"
                                className="w-full rounded-3xl bg-white/[0.03] border border-white/[0.04] px-5 py-4 outline-none resize-none leading-8 focus:border-white/[0.08] transition"
                            />
                        </div>

                        {/* Boundaries */}
                        <div>
                            <label className="block text-sm text-white/40 mb-3">
                                Emotional Boundaries
                            </label>

                            <textarea
                                rows={5}
                                placeholder="does not trust easily, requires emotional safety before intimacy..."
                                className="w-full rounded-3xl bg-white/[0.03] border border-white/[0.04] px-5 py-4 outline-none resize-none leading-8 focus:border-white/[0.08] transition"
                            />
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <button className="h-14 px-8 rounded-2xl bg-white text-black font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                Create Character
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCharacterPage;
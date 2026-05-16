import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { ArrowLeft } from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createCharacter,
  getCharacterById,
  updateCharacter,
} from "../../services/api/character.api";

const CreateCharacterPage = () => {
  const navigate = useNavigate();

  const { characterId } = useParams();

  const isEditMode = !!characterId;

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",

    image: "",

    tagline: "",

    personality: "",

    background: "",

    emotionalBoundaries: "",

    speechStyle: "",

    relationshipStyle: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCharacter = async () => {
    if (!characterId) return;

    try {
      const response: any =
        await getCharacterById(
          characterId
        );

      const character = response.data;

      setForm({
        name: character.name || "",

        image: character.image || "",

        tagline:
          character.tagline || "",

        personality:
          character.personality || "",

        background:
          character.background || "",

        emotionalBoundaries:
          character.emotionalBoundaries ||
          "",

        speechStyle:
          character.speechStyle || "",

        relationshipStyle:
          character.relationshipStyle ||
          "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return;

    try {
      setLoading(true);

      if (isEditMode) {
        await updateCharacter(
          characterId!,
          form
        );
      } else {
        await createCharacter(form);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className="relative h-full overflow-y-auto bg-[#09090a] text-white">
      {/* Ambient */}
      <div className="absolute top-[-150px] left-[10%] w-[400px] h-[400px] rounded-full bg-[#6b2d5c]/10 blur-[120px]" />

      <div className="absolute bottom-[-150px] right-[10%] w-[500px] h-[500px] rounded-full bg-[#243b6b]/10 blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-8 py-16">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-10 flex items-center gap-2 text-white/40 hover:text-white/70 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Title */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-14"
        >
          <h1 className="text-5xl font-semibold tracking-tight">
            {isEditMode
              ? "Edit Character"
              : "Create Character"}
          </h1>

          <p className="text-white/35 mt-4 text-lg">
            {isEditMode
              ? "Refine emotional identity and behavior."
              : "Build someone emotionally unforgettable."}
          </p>
        </motion.div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-7">
            {/* Image */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Character Image URL
              </label>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/[0.05] px-5 outline-none focus:border-white/15 transition"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nancy"
                className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/[0.05] px-5 outline-none focus:border-white/15 transition"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Tagline
              </label>

              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="some people stay longer in your mind"
                className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/[0.05] px-5 outline-none focus:border-white/15 transition"
              />
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Personality
              </label>

              <textarea
                rows={5}
                name="personality"
                value={form.personality}
                onChange={handleChange}
                placeholder="emotionally intelligent, playful when safe..."
                className="w-full rounded-3xl bg-white/[0.04] border border-white/[0.05] p-5 outline-none resize-none focus:border-white/15 transition"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-7">
            {/* Background */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Background
              </label>

              <textarea
                rows={5}
                name="background"
                value={form.background}
                onChange={handleChange}
                placeholder="global pop icon hiding emotional loneliness..."
                className="w-full rounded-3xl bg-white/[0.04] border border-white/[0.05] p-5 outline-none resize-none focus:border-white/15 transition"
              />
            </div>

            {/* Emotional Boundaries */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Emotional Boundaries
              </label>

              <textarea
                rows={4}
                name="emotionalBoundaries"
                value={
                  form.emotionalBoundaries
                }
                onChange={handleChange}
                placeholder="requires emotional trust before intimacy..."
                className="w-full rounded-3xl bg-white/[0.04] border border-white/[0.05] p-5 outline-none resize-none focus:border-white/15 transition"
              />
            </div>

            {/* Speech Style */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Speech Style
              </label>

              <input
                type="text"
                name="speechStyle"
                value={form.speechStyle}
                onChange={handleChange}
                placeholder="soft, teasing, reflective..."
                className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/[0.05] px-5 outline-none focus:border-white/15 transition"
              />
            </div>

            {/* Relationship Style */}
            <div>
              <label className="block text-sm text-white/50 mb-3">
                Relationship Style
              </label>

              <input
                type="text"
                name="relationshipStyle"
                value={
                  form.relationshipStyle
                }
                onChange={handleChange}
                placeholder="slow burn attachment"
                className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/[0.05] px-5 outline-none focus:border-white/15 transition"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-end">
          <button
            onClick={
              handleSubmit
            }
            disabled={loading}
            className="h-14 px-10 rounded-2xl bg-white text-black text-[15px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Character"
                : "Create Character"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
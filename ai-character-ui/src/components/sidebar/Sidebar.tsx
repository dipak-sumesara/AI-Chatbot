import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";

import ConversationList from "./conversations/ConversationList";

import { type Conversation } from "../../types/conversation.types";

import { useNavigate } from "react-router-dom";

import { getAllCharacters } from "../../services/api/character.api";

import {
  createConversation,
  getConversationsByCharacter,
} from "../../services/api/conversation.api";

import { type Character } from "../../types/character.types";

type Props = {
  selectedCharacter: Character | null;

  setSelectedCharacter: (
    character: Character
  ) => void;

  selectedConversation: any;

  setSelectedConversation: (
    conversation: any
  ) => void;
};

const Sidebar = ({
  selectedCharacter,
  setSelectedCharacter,
  setSelectedConversation,
  selectedConversation
}: Props) => {
  const navigate = useNavigate();

  const [characters, setCharacters] =
    useState<Character[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    expandedCharacterId,
    setExpandedCharacterId,
  ] = useState<string | null>(null);

  const [conversationsMap, setConversationsMap] =
    useState<
      Record<string, Conversation[]>
    >({});

  const fetchCharacters = async () => {
    try {
      const response: any =
        await getAllCharacters();

      setCharacters(response.data);

      if (
        response.data.length > 0 &&
        !selectedCharacter
      ) {
        handleCharacterClick(
          response.data[0]
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = async (
    character: Character
  ) => {
    try {
      setSelectedCharacter(character);

      if (
        expandedCharacterId ===
        character._id
      ) {
        setExpandedCharacterId(null);

        return;
      }

      setExpandedCharacterId(
        character._id
      );

      let conversations =
        conversationsMap[
        character._id
        ];

      if (!conversations) {
        conversations =
          await fetchConversations(
            character._id
          );
      }

      let latestConversation =
        conversations?.[0];

      if (!latestConversation) {
        const created: any =
          await createConversation({
            characterId:
              character._id,
          });

        latestConversation =
          created.data;

        await fetchConversations(
          character._id
        );
      }

      setSelectedConversation(
        latestConversation
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchConversations =
    async (characterId: string) => {
      try {
        const response: any =
          await getConversationsByCharacter(
            characterId
          );

        setConversationsMap((prev) => ({
          ...prev,

          [characterId]:
            response.data,
        }));

        return response.data;
      } catch (error) {
        console.error(error);

        return [];
      }
    };

  useEffect(() => {
    fetchCharacters();
  }, []);

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
        <button
          onClick={() =>
            navigate("/character/create")
          }
          className="w-full h-12 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] border border-white/[0.04] transition-all duration-300 flex items-center justify-center gap-2 text-white/90"
        >
          <Plus size={18} />
          Create Character
        </button>
      </div>

      {characters.map((character) => (
        <div key={character._id}>
          {/* Character */}
          <button
            onClick={() =>
              handleCharacterClick(
                character
              )
            }
            className={`
        w-full p-3 rounded-[24px]
        transition-all duration-500
        flex items-center justify-between
        text-left group

        ${selectedCharacter?._id ===
                character._id
                ? "bg-white/[0.06]"
                : "hover:bg-white/[0.04]"
              }
      `}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              {/* Avatar */}
              <div className="relative">
                {character.image ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3f3f46] to-[#1c1c1f]" />
                )}

                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border border-black" />
              </div>

              {/* Text */}
              <div className="overflow-hidden">
                <h3 className="text-sm text-white/90 font-medium">
                  {character.name}
                </h3>

                <p className="text-xs text-white/35 truncate mt-1">
                  {character.tagline}
                </p>
              </div>
            </div>

            <ChevronDown
              size={16}
              className={`
          text-white/30 transition-transform duration-300

          ${expandedCharacterId ===
                  character._id
                  ? "rotate-180"
                  : ""
                }
        `}
            />
          </button>

          {/* Conversations */}
          {expandedCharacterId ===
            character._id && (
              <ConversationList
                conversations={
                  conversationsMap[
                  character._id
                  ] || []
                }
                selectedConversation={
                  selectedConversation
                }
                onSelectConversation={
                  setSelectedConversation
                }
              />
            )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
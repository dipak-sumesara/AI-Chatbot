import { useEffect, useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

import { getMessagesByConversation } from "../../services/api/message.api";

import { type Character } from "../../types/character.types";
import { type Conversation } from "../../types/conversation.types";
import { type Message } from "../../types/message.types";

const ChatPage = () => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(null);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState<Conversation | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [isTyping, setIsTyping] =
    useState(false);

  const fetchMessages = async () => {
    if (!selectedConversation?._id) return;

    try {
      setLoadingMessages(true);

      const response: any =
        await getMessagesByConversation(
          selectedConversation._id
        );

      setMessages(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation]);

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0a0a0b]">
      {/* Ambient Glow */}
      <div className="absolute top-[-200px] left-[20%] w-[500px] h-[500px] rounded-full bg-[#6b2d5c]/10 blur-[140px]" />

      <div className="absolute bottom-[-250px] right-[10%] w-[600px] rounded-full bg-[#2d436b]/10 blur-[160px]" />

      {/* Sidebar */}
      <Sidebar
        selectedCharacter={
          selectedCharacter
        }
        setSelectedCharacter={
          setSelectedCharacter
        }
        selectedConversation={
          selectedConversation
        }
        setSelectedConversation={
          setSelectedConversation
        }
      />

      {/* Main */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ChatHeader
          character={selectedCharacter}
          setSelectedConversation={
            setSelectedConversation
          }
        />

        <ChatWindow
          messages={messages}
          loading={loadingMessages}
          selectedCharacter={selectedCharacter}
          isTyping={isTyping}
          conversation={selectedConversation}
          setIsTyping={setIsTyping}
          setMessages={setMessages}
        />

        <ChatInput
          conversation={
            selectedConversation
          }
          messages={messages}
          setMessages={setMessages}
          setIsTyping={setIsTyping}
        />
      </div>
    </div>
  );
};

export default ChatPage;
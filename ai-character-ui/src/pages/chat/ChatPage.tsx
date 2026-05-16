import Sidebar from "../../components/sidebar/Sidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

const ChatPage = () => {
  return (
    <div className="relative flex h-full overflow-hidden bg-[#0a0a0b]">
      {/* Ambient Glow */}
      <div className="absolute top-[-200px] left-[20%] w-[500px] h-[500px] rounded-full bg-[#6b2d5c]/10 blur-[140px]" />

      <div className="absolute bottom-[-250px] right-[10%] w-[600px] h-[600px] rounded-full bg-[#2d436b]/10 blur-[160px]" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="relative flex flex-1 flex-col">
        <ChatHeader />

        <ChatWindow />

        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
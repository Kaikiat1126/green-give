import ChatContainer from "./chat-container"
import { getChats } from "@/utils/getChats"

export default async function Chat() {
  const chats = await getChats();
  
  return (
    <div className="py-4 flex flex-col gap-y-2 max-h-screen mb-1">
      <ChatContainer chats={chats} />
    </div>
  )
}
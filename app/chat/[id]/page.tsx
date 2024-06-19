import { getChatsWithId } from "@/utils/getChats"
import ChatPanel from "../chat-panel"

export default async function ChatWithId(
  { params: { id } }: { params: { id: string } }
) {
  const chat = await getChatsWithId(id)

  return (
    <div className="py-4 flex flex-col gap-y-2">
      <div className="h-[73vh]">
        <ChatPanel chatId={id} user={chat.owner_id_1 ?? chat.owner_id_2} />
      </div>
    </div>
  )
}
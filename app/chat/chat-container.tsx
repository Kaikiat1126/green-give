'use client'

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatUser from "./chat-user"
import ChatPanel from "./chat-panel"
import useMediaQuery from "@/utils/hooks/useMediaQuery"
import { useRouter } from "next/navigation"

type Props = {
  chats: any[]
}

export default function ChatContainer({ chats }: Props) {
  const isMobile = useMediaQuery("(max-width: 475px)")
  const [chatId, setChatId] = useState<string>("")
  const [chatUser, setChatUser] = useState<any>({})
  const router = useRouter()

  function handleChatClick(chatId: string, user: any) {
    if(isMobile) {
      router.push(`/chat/${chatId}`)
    } else {
      setChatId(chatId)
      setChatUser(user)
    }
  }

  return (
    <div className="grid grid-cols-4">
      <div className="xs:col-span-1 col-span-4 md:h-[80vh] h-[73vh] xs:border-r border-r-0">
        <ScrollArea className="max-h-[80vh] xs:pe-2">
          {
            chats.map((chat) => (
              <ChatUser 
                key={chat.id} 
                currentSelected={chatId === chat.id}
                user={chat.owner_id_1 ?? chat.owner_id_2} 
                lastMessage={chat.messages[chat.messages.length - 1]}
                _onClick={() => handleChatClick(chat.id, chat.owner_id_1 ?? chat.owner_id_2)}
              />
            ))
          }
        </ScrollArea>
      </div>
      {
        !isMobile && (
          <div className="col-span-3 xs:block hidden md:h-[80vh] h-[73vh]">
            <div className="ps-4 pb-0 h-full">
              {
                chatId && <ChatPanel chatId={chatId} user={chatUser} />
              }
              {
                !chatId && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-lg font-medium text-grey-2">Your messages</div>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}
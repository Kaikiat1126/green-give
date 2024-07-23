'use client'

import { useState, useEffect, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatUser from "./chat-user"
import ChatPanel from "./chat-panel"
import useMediaQuery from "@/utils/hooks/useMediaQuery"
import { useRouter } from "next/navigation"
import { getChats } from "@/utils/getChats"
import { createClient } from "@/utils/supabase/client"

export default function ChatContainer() {
  const isMobile = useMediaQuery("(max-width: 474px)")
  const [chats, setChats] = useState<any[]>([])
  const [chatId, setChatId] = useState<string>("")
  const [chatUser, setChatUser] = useState<any>({})
  const router = useRouter()
  const supabase = createClient()

  const getChatsData = useCallback(async () => {
    await getChats().then((data) => {
      if(data) {
        setChats(data)
      }
    })
  }, [])

  useEffect(() => {
    getChatsData()
  }, [getChatsData])

  useEffect(() => {
    const subscription = supabase
      .channel(`chats_and_messages_changes`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "chats",
      }, () => {
        getChatsData()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [getChatsData, supabase])


  function handleChatClick(chatId: string, user: any) {
    if(isMobile) {
      router.push(`/chat/${chatId}`)
    } else {
      setChatId(chatId)
      setChatUser(user)
    }
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-medium text-grey-2">No messages to show</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4">
      <div className="xs:col-span-1 col-span-4 md:h-[80vh] h-[73vh] xs:border-r border-r-0">
        <ScrollArea className="max-h-[80vh] xs:pe-2">
          {
            chats && chats.map((chat) => (
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
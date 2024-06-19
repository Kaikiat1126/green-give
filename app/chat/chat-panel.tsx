'use client'

import { useRef, useEffect, useState, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import ProfileAvatar from "@/components/posts/profile-avatar"
import Message from "./message"
import { getMessages } from "@/utils/getChats"
import { addMessage } from "@/utils/addMessage"
import { createClient } from "@/utils/supabase/client"
import { SubmitButton } from "@/components/ui/submit-button"
import { formatDate } from "@/utils/date"

type Props = {
  chatId: string
  user: any
}

export default function ChatPanel({chatId, user}: Props){
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const scrollRefV2 = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()
  const { toast } = useToast()

  const scrollToBottom = () => {
    const scrollArea = scrollRefV2.current
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea?.scrollHeight
    }
  }

  const fetchMessages = useCallback(async () => {
    await getMessages(chatId)
      .then((data) => {
        if(data) {
          setMessages(data)
        }
        setLoading(false)
        scrollToBottom()
    })
  }, [chatId])

  useEffect(() => {
    setLoading(true)
    fetchMessages()
  }, [chatId, fetchMessages])

  useEffect(() => {
    const subscription = supabase
      .channel(`messages:chat_id=${chatId}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "messages",
      }, () => {
        fetchMessages()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [chatId, supabase, fetchMessages])

  useEffect(() => {
    scrollToBottom()
  }, [scrollRefV2])

  function handleSendMessage(formData: FormData) {
    const message = formData.get("message") as string
    addMessage(chatId, message).then(() => {
      scrollToBottom()
      inputRef.current!.value = ""
    }).catch((error) => {
      showToaster(error.message, false)
    })
  }

  function showToaster(message: string, success: boolean) {
    toast({ title: message, variant: success ? 'default' : 'destructive', })
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row gap-x-4 items-center pb-2 border-b mb-1">
        <ProfileAvatar userId={user.id} className="h-9 w-9" />
        <div className="font-medium">{user.first_name}</div>
      </div>
      <ScrollArea ref={scrollRefV2} className="w-full h-full pb-1 pe-2.5">
        <div>
          {
            loading ? (
              <div className="flex flex-col items-center justify-center my-6">
                <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-[#16a34a] rounded-full"></div>
              </div>
            ) : (
              messages.map((message,index) => (
                <Message 
                  key={message.id}
                  message={message} 
                  amISender={message.sender_id !== user.id}
                  showDate={index === 0 || formatDate(message.created_at) !== formatDate(messages[index - 1].created_at)}
                />
              ))
            )
          }
        </div>
      </ScrollArea>
      <div className="relative mt-auto">
        <form className="flex flex-row items-center gap-x-4">
          <Input 
            ref={inputRef}
            name="message" 
            placeholder="Type a message" 
            className="md:w-4/5 w-full" 
            required 
          />
          <SubmitButton 
            variant="default" 
            type="button" 
            pendingText="..." 
            formAction={handleSendMessage}
          >
            Send
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
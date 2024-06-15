import { useEffect, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getUserProfile } from "@/app/auth/get-user"

export default function UserRow(){
  const [userId, setUserId] = useState<string>("")
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    getUserProfile().then((data) => {
      setUserId(data?.id)
      setUsername(data?.first_name)
    })
  }, [])
  
  return (
    <div className="inline-flex flex-row items-center gap-x-4">
      <Avatar>
        { userId && <AvatarImage src={`https://api.multiavatar.com/` + userId + `.svg`} alt="@greengive" />}
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <span className="text-grey-1 font-semibold tracking-tight">
        {username}
      </span>
    </div>
  )
}
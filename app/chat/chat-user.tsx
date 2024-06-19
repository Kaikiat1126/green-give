import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { calculateAgo } from "@/utils/date"

type Props = {
  currentSelected?: boolean
  user: any
  lastMessage?: any
  _onClick?: () => void
}

export default function ChatUser({ currentSelected, user, lastMessage, _onClick }: Props) {
  return (
    <Button 
      variant={currentSelected ? "secondary" : "ghost"}
      className="h-auto w-full justify-start md:justify-start xs:justify-center p-2"
      onClick={_onClick}
    >
      <Avatar className="h-12 w-12 md:h-12 md:w-13 xs:h-13 xs:w-14 mr-2">
        <AvatarImage src={`https://api.multiavatar.com/` + user.id + `.svg`} alt="@greengive" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full gap-y-1 items-start md:flex xs:hidden">
        <div className="font-medium">{user.first_name}</div>
        <div className="flex flex-row w-full items-center justify-between">
          <div className="text-xs line-clamp-1 text-grey-2">{lastMessage.message}</div>
          {
            !currentSelected && lastMessage && (
              <div className="text-xs text-grey-2">
                { calculateAgo(lastMessage.created_at)}
              </div>
            
            )
          }
        </div>
      </div>
    </Button>
  )
}
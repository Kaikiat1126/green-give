import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { getUserAvatarSrc } from "@/utils/getAvatar"

export default async function UserAvatar({ className }: { className?: string }){
  const avatarSrc = await getUserAvatarSrc();
  return (
    <Avatar className={className}>
      <AvatarImage src={avatarSrc} alt="@greengive" />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  )
}
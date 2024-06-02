import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { getUserAvatarSrc, getUserAvatarSrcById } from "@/utils/getAvatar"

type UserAvatarProps = {
  className?: string;
  userId?: string;
}

export default async function UserAvatar({ className, userId }: UserAvatarProps){
  const avatarSrc = userId ? await getUserAvatarSrcById(userId) : await getUserAvatarSrc();
  return (
    <Avatar className={className}>
      <AvatarImage src={avatarSrc} alt="@greengive" />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  )
}
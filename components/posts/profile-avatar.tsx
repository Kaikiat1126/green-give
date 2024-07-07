import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

type Props = {
  userId: string
  className?: string
}

export default function ProfileAvatar({ userId, className }: Props) {
  return (
    <Link href={`/public-profile/${userId}`}>
      <Avatar className={`h-10 w-10 ${className}`}>
        <AvatarImage src={`https://api.multiavatar.com/` + userId + `.svg?apikey=trCeWEJuKTsBIx`} alt="@greengive" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </Link>
  )
}
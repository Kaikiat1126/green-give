import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

type Props = {
  userId: string
}

export default function ProfileAvatar({ userId }: Props) {
  return (
    <Link href={`/public-profile/${userId}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={`https://api.multiavatar.com/` + userId + `.svg`} alt="@greengive" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </Link>
  )
}
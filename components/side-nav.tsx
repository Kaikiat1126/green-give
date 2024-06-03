import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify, Award, CircleUser, Earth, Home, LayoutList, LogOut, MapPinned, Smile } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import UserAvatar from "./user-avatar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function SideNav({displayName}: {displayName: string}) {
  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect("/")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-3">
          <AlignJustify color="#09090B" className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-60 flex flex-col justify-between">
        <div className="flex flex-col gap-y-4 py-4">
          <div className="flex flex-row items-center gap-x-4 mb-4 px-2">
            <UserAvatar className="w-16 h-16" />
            <div>{displayName}</div>
          </div>
          <SideBarLink href="" text="Home">
            <Home color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="impact" text="My Impact">
            <Earth color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="levels" text="My Levels">
            <Award color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="listings" text="My Listings">
            <LayoutList color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="location" text="Location">
            <MapPinned color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="profile" text="Profile">
            <Smile color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
          <SideBarLink href="account" text="Account">
            <CircleUser color="#09090B" className="mr-3 h-5 w-5" />
          </SideBarLink>
        </div>
        <form action={handleSignOut}>
          <Button variant="outline" type="submit" className="py-2 flex items-center rounded-md px-2 w-full">
            <LogOut color="#09090B" className="mr-3 h-5 w-5" />
            <span>Log out</span>
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

function SideBarLink({ href, children, text }: { href: string, children: React.ReactElement, text: string }) {
  return (
    <Link href={`/${href}`} className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
      {children}
      <span>{text}</span>
    </Link>
  )
}
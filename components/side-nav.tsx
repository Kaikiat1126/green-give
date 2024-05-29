'use client'

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { AlignJustify, Award, CircleUser, Earth, Home, LayoutList, LogOut, Smile } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export default function SideNav() {
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
            <Avatar className=" w-14 h-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>KaiKiat Tyu</div>
          </div>
          <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <Home color="#09090B" className="mr-3 h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/impact" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <Earth color="#09090B" className="mr-3 h-5 w-5" />
            <span>My Impact</span>
          </Link>
          <Link href="/levels" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <Award color="#09090B" className="mr-3 h-5 w-5" />
            <span>My Levels</span>
          </Link>
          <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <LayoutList color="#09090B" className="mr-3 h-5 w-5" />
            <span>My Listings</span>
          </Link>
          <Link href="/profile" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <Smile color="#09090B" className="mr-3 h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
            <CircleUser color="#09090B" className="mr-3 h-5 w-5" />
            <span>Account</span>
          </Link>
        </div>
        <Button variant="outline" className="py-2 flex items-center rounded-md px-2">
          <LogOut color="#09090B" className="mr-3 h-5 w-5" />
          <span>Log out</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
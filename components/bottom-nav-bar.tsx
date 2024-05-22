'use client'

import Link from "next/link"
import { Home, Mail, MessagesSquare, Plus, Smile } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function BottomNavBar() {
  return (
    <div className="md:hidden block fixed left-0 bottom-0 w-full px-6 pb-4 pt-6 bg-white border-t">
      <div className="flex justify-between items-center">
        <Link href="/" className="relative flex flex-col items-center">
          <Home className="mb-5"/>
          <span className="text-xs absolute top-2/3">Home</span>
        </Link>
        <Link href="/community" className="relative flex flex-col items-center">
          <MessagesSquare className="mb-5"/>
          <span className="text-xs absolute top-2/3">Community</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <div className="relative flex flex-col items-center">
              <Button variant="outline" size="icon" className="rounded-full relative bottom-4 bg-[#16a34a] h-11 w-11 text-white">
                <Plus />
              </Button>
              <span className="text-xs absolute top-2/3">Add</span>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom">
          </SheetContent>
        </Sheet>
        <Link href="/message" className="relative flex flex-col items-center">
          <Mail className="mb-5" />
          <span className="text-xs absolute top-2/3">Message</span>
        </Link>
        <Link href="/profile" className="relative flex flex-col items-center">
          <Smile className="mb-5" />
          <span className="text-xs absolute top-2/3">Profile</span>
        </Link>
      </div>
    </div>
  )
}
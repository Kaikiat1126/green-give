'use client'

import Link from "next/link"
import { Home, Mail, MessagesSquare, Plus, Smile } from "lucide-react"
import { Button } from "./ui/button"
import AddItemDrawer from "./add-item/add-item-drawer"
import useMediaQuery from "@/utils/hooks/useMediaQuery"
import BigScreenBottomButton from "./add-item/big-screen-bottom-button"

export default function BottomNavBar() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {
        !isMobile ? 
          <BigScreenBottomButton /> :
        (
          <div className="md:hidden block h-[4.5rem]">
            <div className="fixed left-0 bottom-0 w-full px-6 pb-4 pt-6 bg-white border-t">
              <div className="flex justify-between items-center">
                <Link href="/" className="relative flex flex-col items-center">
                  <Home className="mb-5"/>
                  <span className="text-xs absolute top-2/3">Home</span>
                </Link>
                <Link href="/community" className="relative flex flex-col items-center">
                  <MessagesSquare className="mb-5"/>
                  <span className="text-xs absolute top-2/3">Community</span>
                </Link>
                <AddItemDrawer>
                  <div className="relative flex flex-col items-center">
                    <Button variant="outline" size="icon" className="rounded-full relative bottom-4 bg-[#16a34a] hover:bg-[#3fb968] h-11 w-11">
                      <Plus color="#ffffff" />
                    </Button>
                    <span className="text-xs absolute top-2/3">Add</span>
                  </div>
                </AddItemDrawer>
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
          </div>
        )
      }
    </>
  )
}
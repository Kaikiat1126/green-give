'use client'

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import GreenGive from "@/public/android-chrome-192x192.png"
import { Montserrat } from "next/font/google";
import { LogOut, User } from "lucide-react"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function NavBar() {
  return(
    <nav className="bg-white">
      <div className="max-w-screen-xl flex flex-row justify-between items-center mx-auto px-4 py-6">
          <Link href="/" className="flex flex-row items-center">
            <Image src={GreenGive} alt="GreenGive" width={36} height={36} />
            <strong className={"text-xl text-[#16a34a] tracking-wide font-bold ml-3 " + montserrat.className}>GreenGive</strong>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="gap-x-4">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Community
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Message
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex flex-row items-center gap-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>Kaikiat Tyu</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>My Impact</DropdownMenuItem>
            <DropdownMenuItem>My Levels</DropdownMenuItem>
            <DropdownMenuItem>My Listings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
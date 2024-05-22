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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import GreenGive from "@/public/android-chrome-192x192.png"
import { Montserrat } from "next/font/google";
import { AlignJustify, Award, CircleUser, Earth, Home, LayoutList, LogOut, Smile } from "lucide-react"
import { Button } from "./ui/button"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function NavBar() {
  return(
    <nav className="bg-white">
      <div className="max-w-screen-xl flex flex-row justify-between items-center mx-auto px-4 py-6">
        <Link href="/" className="flex flex-row items-center">
          <Image src={GreenGive} alt="GreenGive" width={36} height={36} />
          <strong className={"text-xl text-[#16a34a] tracking-wide font-bold ml-3 " + montserrat.className}>GreenGive</strong>
        </Link>
        <NavigationMenu className="md:block hidden">
          <NavigationMenuList className="gap-x-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Market
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
        <div className="md:block hidden">
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
              <DropdownMenuItem>
                <CircleUser className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Smile color="#09090B" className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Earth color="#09090B" className="mr-2 h-4 w-4" />
                <span>My Impact</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Award color="#09090B" className="mr-2 h-4 w-4" />
                <span>My Levels</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LayoutList color="#09090B" className="mr-2 h-4 w-4" />
                <span>My Listings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut color="#09090B" className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <AlignJustify color="#09090B" />
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
                <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
                  <Earth color="#09090B" className="mr-3 h-5 w-5" />
                  <span>My Impact</span>
                </Link>
                <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
                  <Award color="#09090B" className="mr-3 h-5 w-5" />
                  <span>My Levels</span>
                </Link>
                <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
                  <LayoutList color="#09090B" className="mr-3 h-5 w-5" />
                  <span>My Listings</span>
                </Link>
                <Link href="/" className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2">
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
        </div>
      </div>
    </nav>
  )
}
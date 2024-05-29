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
import { useRouter } from 'next/navigation'
import { Montserrat } from "next/font/google";
import { Award, CircleUser, Earth, LayoutList, LogOut, Smile } from "lucide-react"
import SideNav from "./side-nav"
import { signOut } from "@/app/auth/sign-out"
import { User } from "@supabase/supabase-js"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function NavBar({ user }: { user: User}) {

  const router = useRouter();
  async function sign_out() {
    await signOut()
    return router.replace("/sign-in")
  }
  
  return(
    <nav className="bg-white md:border-b-0 border-b">
      <div className="max-w-screen-xl flex flex-row justify-between items-center mx-auto px-4 md:py-6 py-3">
        <Link href="/" className="flex flex-row items-center">
          <strong className={"text-lg text-[#16a34a] tracking-wide font-bold " + montserrat.className}>GreenGive</strong>
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
                <div>{ user.user_metadata.first_name + " " + user.user_metadata.last_name }</div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <CircleUser className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="inline-flex">
                  <Smile color="#09090B" className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/impact" className="inline-flex">
                  <Earth color="#09090B" className="mr-2 h-4 w-4" />
                  <span>My Impact</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#f4f4f5] cursor-pointer">
                <Link href="/levels" className="inline-flex">
                  <Award color="#09090B" className="mr-2 h-4 w-4" />
                  <span>My Levels</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LayoutList color="#09090B" className="mr-2 h-4 w-4" />
                <span>My Listings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-[#f4f4f5] cursor-pointer" onClick={sign_out}>
                <LogOut color="#09090B" className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:hidden block">
          <SideNav />
        </div>
      </div>
    </nav>
  )
}
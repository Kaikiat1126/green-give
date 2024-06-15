'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Award, BookCopy, CalendarDays, CircleUser, Earth, LayoutList, MapPinned, Smile } from "lucide-react"
import NavBarItem from "./nav-bar-item"

type Props = {
  children: React.ReactNode
  signOutChild?: React.ReactNode
}
export default function NavBarDropDown({ children, signOutChild }: Props) {

  const pathname = usePathname()

  const list = [
    { href: "account", text: "Account", icon: CircleUser },
    { href: "profile", text: "Profile", icon: Smile },
    { href: "impact", text: "My Impact", icon: Earth },
    { href: "levels", text: "My Levels", icon: Award },
    { href: "listings", text: "My Listings", icon: LayoutList },
    { href: "posts", text: "My Posts", icon: BookCopy },
    { href: "campaign", text: "Campaign", icon: CalendarDays },
    { href: "location", text: "Location", icon: MapPinned }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          list.slice(0, 1).map((item) => (
            <NavBarItem 
              key={item.text} 
              href={item.href} 
              text={item.text}
              active={pathname === `/${item.href}`}
              icon={item.icon}
            />
          ))
        }
        <DropdownMenuSeparator />
        {
          list.slice(1).map((item) => (
            <NavBarItem 
              key={item.text} 
              href={item.href} 
              text={item.text}
              active={pathname === `/${item.href}`}
              icon={item.icon}
            />
          ))
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-[#f4f4f5] cursor-pointer">
          {signOutChild}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
'use client'
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify, Award, CircleUser, Earth, Home, LayoutList, MapPinned, Smile } from "lucide-react"
import { Button } from "../ui/button"
import SideBarLink from "./side-bar-link";

type Props = {
  displayName: string;
  children?: React.ReactNode;
  logoutChild?: React.ReactNode;
}

export default function SideNav(
  { displayName, logoutChild, children }: Props
) {

  const [open, setOpen] = useState<boolean>(false);

  const list = [
    { href: "", text: "Home", icon: Home },
    { href: "impact", text: "My Impact", icon: Earth },
    { href: "levels", text: "My Levels", icon: Award },
    { href: "listings", text: "My Listings", icon: LayoutList },
    { href: "location", text: "Location", icon: MapPinned },
    { href: "profile", text: "Profile", icon: Smile },
    { href: "account", text: "Account", icon: CircleUser }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-3">
          <AlignJustify color="#09090B" className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-60 flex flex-col justify-between">
        <div className="flex flex-col gap-y-4 py-4">
          <div className="flex flex-row items-center gap-x-4 mb-4 px-2">
            { children }
            <div>{displayName}</div>
          </div>
          {
            list.map((item) => (
              <SideBarLink 
                key={item.text} 
                href={item.href} 
                text={item.text}
                onClick={()=>setOpen(false)}
              >
                <item.icon color="#09090B" className="mr-3 h-5 w-5" />
              </SideBarLink>
            ))
          }
        </div>
        { logoutChild }
      </SheetContent>
    </Sheet>
  )
}
'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function NavBarButton(){
  const pathname = usePathname()
  const list = [
    { href: "/", text: "Home" },
    { href: "/community", text: "Community" },
    { href: "/chat", text: "Message" }
  ]

  return (
    <div className="inline-flex flex-row items-center gap-x-4">
      {
        list.map((item) => (
          <Button 
            key={item.text} 
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={`${pathname === item.href ? "text-[#16a34a] bg-[#e8ffed]" : "text-[#09090B]"}`}
            asChild
          >
            <Link href={item.href}>{item.text}</Link>
          </Button>
        ))
      }
    </div>
  )
}
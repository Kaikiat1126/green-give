import { DropdownMenuItem } from "../ui/dropdown-menu"
import Link from "next/link"

type Props = {
  href: string
  active?: boolean
  text?: string
  icon?: any
}

export default function NavBarItem({href, active, text, icon: Icon}: Props){
  return (
    <DropdownMenuItem 
      className={`cursor-pointer ${active ? "hover:bg-[#E8FFED]" : "hover:bg-[#f4f4f5]"}`}
    >
      <Link 
        href={href} 
        className={`inline-flex items-center ${active ? "text-primary" : "text-[#09090B]"}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{text}</span>
      </Link>
    </DropdownMenuItem>
  )
}
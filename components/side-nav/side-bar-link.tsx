'use client'
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactElement;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SideBarLink({ href, children, text, active, onClick }: Props) {
  return (
    <Link 
      href={`/${href}`} 
      className={`py-2 flex items-center rounded-md px-2 ${active ? "text-primary hover:bg-[#E8FFED]" : "text-[#09090B] hover:bg-[#f2f3f5]"}`}
      onClick={onClick}
    >
      {children}
      <span>{text}</span>
    </Link>
  )
}
'use client'
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactElement;
  text: string;
  onClick?: () => void;
}

export default function SideBarLink({ href, children, text, onClick }: Props) {
  return (
    <Link 
      href={`/${href}`} 
      className="py-2 flex items-center hover:bg-[#f2f3f5] rounded-md px-2"
      onClick={onClick}
    >
      {children}
      <span>{text}</span>
    </Link>
  )
}
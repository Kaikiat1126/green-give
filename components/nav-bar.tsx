import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Montserrat } from "next/font/google";
import { Award, CircleUser, Earth, LayoutList, LogOut, Smile } from "lucide-react"
import SideNav from "./side-nav";
import UserAvatar from "./user-avatar";
import { getUser } from "@/app/auth/get-user";
import { Button  } from "./ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const montserrat = Montserrat({ subsets: ["latin"] })

export default async function NavBar(){

  const user = await getUser();

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect("/")
  }

  return(
    <nav className="bg-white md:border-b-0 border-b">
      <div className="max-w-screen-2xl flex flex-row justify-between items-center mx-auto px-4 md:py-6 md:px-8 pl-6 py-3">
        <Link href="/" className="flex flex-row items-center">
          <strong className={"text-lg text-[#16a34a] tracking-wide font-bold " + montserrat.className}>GreenGive</strong>
        </Link>
        <div className="md:block hidden">
          <div className="inline-flex flex-row items-center gap-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">Community</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">Message</Link>
            </Button>
          </div>
        </div>
        <div className="md:block hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex flex-row items-center gap-x-4">
                <UserAvatar />
                <div>{ user?.user_metadata.first_name + " " + user?.user_metadata.last_name }</div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/account" className="inline-flex">
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
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
              <DropdownMenuItem className="hover:bg-[#f4f4f5] cursor-pointer">
                <form action={handleSignOut}>
                  <Button variant="ghost" type="submit" className="p-0 h-auto">
                    <LogOut color="#09090B" className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </form>
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
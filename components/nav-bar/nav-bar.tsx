import Link from "next/link"
import { Montserrat } from "next/font/google";
import { LogOut } from "lucide-react"
import NavBarButton from "./nav-bar-button";
import NavBarDropDown from "./nav-bar-drop-down";
import SideNav from "../side-nav/side-nav";
import UserAvatar from "../user-avatar";
import { getUser } from "@/app/auth/get-user";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SideNavLogout from "../side-nav/side-nav-logout";

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
          <NavBarButton />
        </div>
        <div className="md:block hidden">
          <NavBarDropDown
            signOutChild={
              <form action={handleSignOut}>
                <Button variant="ghost" type="submit" className="p-0 h-auto">
                  <LogOut color="#09090B" className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </form>
            }
          >
            <div className="flex flex-row items-center gap-x-4">
              <UserAvatar />
              <div>{ user?.user_metadata.first_name + " " + user?.user_metadata.last_name }</div>
            </div>
          </NavBarDropDown>
        </div>
        <div className="md:hidden block">
          <SideNav 
            displayName={ user?.user_metadata.first_name + " " + user?.user_metadata.last_name } 
            logoutChild={ 
              <SideNavLogout handleSignOut={handleSignOut} /> 
            }
          >
            <UserAvatar className="w-16 h-16" />
          </SideNav>
        </div>
      </div>
    </nav>
  )
}
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default async function SideNavLogout(
  { handleSignOut }: { handleSignOut: () => void }
){
  return (
    <form action={handleSignOut}>
      <Button variant="outline" type="submit" className="py-2 flex items-center rounded-md px-2 w-full">
        <LogOut color="#09090B" className="mr-3 h-5 w-5" />
        <span>Log out</span>
      </Button>
    </form>
  )
}
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getUserProfile } from "../auth/get-user";
import { Button } from "@/components/ui/button";
import ClearCache from "./clear-cache";
import { updateAccountData } from "../auth/update-user-data";

export default async function Account(){

  const data = await getUserProfile();

  const handleUpdateAccount = async (formData: FormData) => {
    'use server'
    const response = await updateAccountData(formData)
    console.log(response);
  }

  return (
    <div className="xs:py-6 py-4 flex flex-col">
      <form className="flex flex-col gap-y-2" action={handleUpdateAccount}>
        <h3 className="font-semibold tracking-tight scroll-m-20 text-lg text-grey-1">My Account</h3>
        <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 xs:gap-y-6 xs:my-4 my-2">
          <div className="inline-flex flex-col gap-y-2">
            <Label htmlFor="username" className="text-grey-2">Username (display name)</Label>
            <Input id="username" type="text" name="username" placeholder="Username" defaultValue={data?.username} required />
          </div>
          <div className="inline-flex flex-col gap-y-2">
            <Label htmlFor="firstname" className="text-grey-2">First name</Label>
            <Input id="firstname" type="text" name="firstname" placeholder="First name" defaultValue={data?.first_name} required />
          </div>
          <div className="inline-flex flex-col gap-y-2">
            <Label htmlFor="lastname" className="text-grey-2">Last name</Label>
            <Input id="lastname" type="text" name="lastname" placeholder="Last name" defaultValue={data?.last_name} required />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-2">
          <div className="inline-flex flex-col gap-y-2">
            <Label htmlFor="email" className="text-grey-2">Email address</Label>
            <Input name="email" className="bg-grey-5 text-grey-1 disabled:opacity-90" value={data?.email} disabled />
          </div>
        </div>
        <h4 className="font-semibold tracking-tight scroll-m-20 text-grey-1">Account data</h4>
        <blockquote className="xs:border-l-2 xs:pl-4 text-sm" >If you encounter any problems using GreenGive then we may ask you to provide this information.</blockquote>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
          <div className="inline-flex flex-col gap-y-2">
            <Label className="text-grey-2">User ID</Label>
            <Input name="userId" className="bg-grey-5 text-grey-1 disabled:opacity-90" 
              value={ data?.id } 
              disabled 
            />
          </div>
        </div>
        <Button type="submit" className="md:w-2/3 w-full self-center md:mt-4">
          Save account
        </Button>
      </form>
      <ClearCache />
    </div>
  )
}
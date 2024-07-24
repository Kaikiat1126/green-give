'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { updateAccountData } from "../auth/update-user-data";

type Props = {
  data: any
}

export default function AccountArea({ data }: Props){
  const { toast } = useToast()

  async function handleUpdateAccount(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await updateAccountData(formData)
      .then((response) => {
        if(response.success) toast({ title: response.success })
        if(response.error) toast({ title: response.error, variant: "destructive" })
      }
    )
  }

  return (
    <form 
      className="flex flex-col gap-y-2"
      onSubmit={handleUpdateAccount}
    >
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
  )
}
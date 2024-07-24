'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileAbout } from "../auth/update-user-data";

type Props = {
  about: string
}

export default function AboutYou({ about }: Props){
  const [aboutYou, setAboutYou] = useState<string>(about)
  const { toast } = useToast()

  useEffect(() => {
    setAboutYou(about)
  }, [about])

  async function handleUpdate(){
    await updateProfileAbout(aboutYou)
      .then((response) => {
        if(response.success) toast({ title: response.success })
        if(response.error) toast({ title: response.error, variant: "destructive" })
      })
  }

  return (
    <>
      <div className="inline-flex flex-col my-4 gap-2">
        <Label htmlFor="about">About you</Label>
        <Textarea 
          placeholder="Tell us about yourself" id="about" name="about" 
          defaultValue={about} 
          onChange={(e) => setAboutYou(e.target.value)}
        />
      </div>
      <Button className="mt-3 md:w-5/6 w-full self-center" onClick={handleUpdate}>Update your profile</Button>
    </>
  )
}
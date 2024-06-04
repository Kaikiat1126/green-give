'use client';
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button";
import { Montserrat } from "next/font/google";
import { signUp } from "./sign-up";
import { useToast } from "@/components/ui/use-toast"
import { redirect } from 'next/navigation';
import TermsAndCondition from "./tnc";

const montserrat = Montserrat({ subsets: ["latin"] })

export default function SignUp() {

  const [confirm, setConfirm] = useState(false)

  const { toast } = useToast()

  async function sign_up(formData: FormData) {
    const response = await signUp(formData)
    
    const success = response?.success;
    toast({
      variant: success ? 'default' : 'destructive',
      title: response.success || response.error,
    })
    if (response.success) redirect('/');
  }

  if (!confirm) return (<TermsAndCondition setConfirm={setConfirm} />)

  return ( 
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="px-5 py-8 min-w-[23rem] sm:border-2 sm:rounded-lg sm:shadow-lg">
        <div className="flex flex-col gap-y-4 xs:px-0 px-6">
          <h1 className="text-2xl font-semibold text-grey-1 text-center">Sign Up</h1>
          <h3 className="text-base font-normal text-grey-2 self-center">Let&lsquo;s get started with 
            <strong className={"ml-1 tracking-wide text-[#16a34a] " + montserrat.className}>GreeGive</strong>
          </h3>
        </div>
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground px-6 my-5">
          <Label className="text-md" htmlFor="username">Username</Label>
          <Input
            type="text"
            className="mb-2"
            name="username"
            placeholder="your username"
            required
          />
          <div className="flex flex-row gap-x-4">
            <div className="flex-1 flex flex-col gap-y-2">
              <Label className="text-md" htmlFor="firstname">First name</Label>
              <Input
                type="text"
                className="mb-2"
                name="firstname"
                placeholder="Frist name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
              <Label className="text-md" htmlFor="lastname">Last name</Label>
              <Input
                type="text"
                className="mb-2"
                name="lastname"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <Label className="text-md" htmlFor="email">Email</Label>
          <Input
            type="email"
            className="mb-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <Label className="text-md" htmlFor="password">Password</Label>
          <Input
            type="password"
            className="mb-4"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton formAction={sign_up} pendingText="Signing Up...">Sign Up</SubmitButton>
        </form>
        <div className="text-sm mb-2 px-6">
          <span className="text-grey-3">Already have an account?</span>
          <span className="ml-2">
            <Link href="/sign-in" className="cursor-pointer font-medium text-blue-3 hover:text-blue-2">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
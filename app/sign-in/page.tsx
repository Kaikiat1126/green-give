'use client';
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button";
import { signIn } from "./sign-in";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from 'next/navigation';

export default function SignIn() {

  const { toast } = useToast()

  async function sign_in(formData: FormData){
    const response = await signIn(formData);

    const success = response?.success;
    toast({
      variant: success ? 'default' : 'destructive',
      title: response.success || response.error,
    })
    if (response.success) redirect('/');
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="px-5 py-8 min-w-[23rem] sm:border-2 sm:rounded-lg sm:shadow-lg">
        <div className="flex flex-col gap-y-4 xs:px-0 px-9">
          <h1 className="text-2xl font-semibold text-grey-1 text-center">Sign In</h1>
          <h3 className="text-base font-normal text-grey-2 xs:w-5/6 self-center">To keep connected with please login with your personal info</h3>
        </div>
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground px-9 my-6">
          <Label className="text-md" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            className="mb-4"
            name="email"
            placeholder="you@example.com"
            required
          />
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            className="mb-4"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton formAction={sign_in} pendingText="Signing In...">Sign In</SubmitButton>
        </form>
        <div className="text-sm mb-2 px-9">
          <span className="text-grey-3">Dont&lsquo;t have an account yet?</span>
          <span className="ml-2">
            <Link href="/sign-up" className="cursor-pointer font-medium text-blue-3 hover:text-blue-2">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
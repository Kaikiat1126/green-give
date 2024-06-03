'use client';
import RequiredLogin from "./required-login";
import { redirect, usePathname } from "next/navigation";

const specialPaths = ["/sign-in", "/sign-up"];

export default function Provider ({children, user}: any) {
  const path = usePathname();
  if (path && specialPaths.includes(path)) {
    if (!user) return children;
    else return redirect("/");
  }

  if (user && path && !specialPaths.includes(path)) {
    return children;
  }

  return <RequiredLogin />;
}
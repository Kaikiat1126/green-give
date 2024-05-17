'use client';

import { signIn } from "next-auth/react"

export default function Test() {
    return <button onClick={() => signIn()}>Sign in</button>
}
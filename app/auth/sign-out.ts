'use server'

import { createClient } from "@/utils/supabase/server"

export async function signOut() {
  const client = createClient()
  const { error } = await client.auth.signOut()
  if (error) return { error: "Failed to sign out" }
  else return { success: "Sign out successful" }
}
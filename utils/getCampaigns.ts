'use server'

import { createClient } from "@/utils/supabase/server"

export async function getCampaigns() {
  const supabase = createClient()
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .gte('date', todayString)
  if (error) throw error
  return data
}
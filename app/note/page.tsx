import { createClient } from '@/lib/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return <div>{JSON.stringify(notes, null, 2)}</div>;
}
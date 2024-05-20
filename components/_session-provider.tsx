import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation';

export default async function SessionProvider({ children }: 
    Readonly<{children: React.ReactNode}>
) {
    const client = createClient();
    const session = await client.auth.getSession();
    const user = session.data?.session?.user;
}
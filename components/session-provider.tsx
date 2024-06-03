import { getUser } from "@/app/auth/get-user";
import Provider from "./provider";

export default async function SessionProvider({children}: any){
  const user = await getUser();
  return <Provider user={user}>{children}</Provider>;
}

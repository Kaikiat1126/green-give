import RequiredLogin from "@/components/required-login";
import { getUser } from "./auth/get-user";

export default async function Home() {
  const user = await getUser();
  
  if (!user) {
    return <RequiredLogin />;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

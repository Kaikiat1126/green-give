import { getUser } from "./auth/get-user";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

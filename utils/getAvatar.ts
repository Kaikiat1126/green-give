import { getUser } from "@/app/auth/get-user";

export async function getUserAvatarSrc(): Promise<string> {
  const api = process.env.MULTIAVATAR_API;
  const user = await getUser();
  return `${api}${user?.id}.svg`;
}

export async function getUserAvatarSrcById(id: string): Promise<string> {
  const api = process.env.MULTIAVATAR_API;
  return `${api}${id}.svg`;
}

export async function getAvatarAPI(): Promise<string> {
  return process.env.MULTIAVATAR_API || "";
}

export function getAvatarAPIKey(): string | undefined{
  return process.env.MULTIAVATAR_API_KEY;
}
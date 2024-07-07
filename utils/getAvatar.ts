import { getUser } from "@/app/auth/get-user";

export async function getUserAvatarSrc(): Promise<string> {
  const api = process.env.MULTIAVATAR_API;
  const key = process.env.MULTIAVATAR_API_KEY;
  const user = await getUser();
  return `${api}${user?.id}.svg?apikey=${key}`;
}

export async function getUserAvatarSrcById(id: string): Promise<string> {
  const api = process.env.MULTIAVATAR_API;
  const key = process.env.MULTIAVATAR_API_KEY;
  return `${api}${id}.svg?apikey=${key}`;
}

export async function getAvatarAPI(): Promise<string> {
  return process.env.MULTIAVATAR_API || "";
}

export function getAvatarAPIKey(): string | undefined{
  return process.env.MULTIAVATAR_API_KEY;
}
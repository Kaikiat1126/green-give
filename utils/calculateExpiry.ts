export default function calculateItemExpiry(
  list_for: number, until_midnight: Boolean, created_at: string
): boolean {
  const expiry = new Date(created_at)
  expiry.setDate(expiry.getDate() + list_for)
  if (until_midnight) {
    expiry.setHours(23, 59, 59, 999)
  }
  return expiry.getTime() < Date.now()
}

export function isExpired(expiry_on: string): boolean {
  return new Date(expiry_on).getTime() < Date.now()
} 
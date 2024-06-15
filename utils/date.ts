export function calculateDateDifferenceWithToday(date: string): number {
  const currentDate = new Date();
  const joinedDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - joinedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getJoinedDate(date: string): string {
  const joinedDate = new Date(date);
  return joinedDate.toLocaleString('default', { month: 'long' }) + " " + joinedDate.getFullYear();
}

export function calculateAgo(date: string): string {
  const currentDate = new Date();
  const postedDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  if (diffHours < 24) {
    if (diffHours <= 1) {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      return `${diffMinutes}${diffMinutes > 1 ? " minutes" : " minute"}`;
    }
    return `${diffHours}${diffHours > 1 ? " hours" : " hour"}`;
  }
  if (diffDays <= 30) {
    return `${diffDays}${diffDays > 1 ? " days" : " day"}`;
  }
  const diffMonths = Math.ceil(diffDays / 30);
  return `${diffMonths}${diffMonths > 1 ? " months" : " month"}`;
}
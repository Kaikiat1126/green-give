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
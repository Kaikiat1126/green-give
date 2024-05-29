export function calculateDateDifferenceWithToday(date: number): number {
  const currentDate = new Date();
  const postDate = new Date(date);
  const diff = currentDate.getTime() - postDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
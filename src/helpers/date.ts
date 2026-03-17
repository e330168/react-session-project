export function getDaysDistance(date: string | Date): number {
  const sessionDate = new Date(date);
  const today = new Date();

  const sessionDateOnly = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffMs = sessionDateOnly.getTime() - todayDateOnly.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
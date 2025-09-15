/**
 * Format a Date object as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse a string (YYYY-MM-DD) into a Date object
 */
export function parseDate(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00");
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function today(): string {
  return formatDate(new Date());
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date.getTime() < new Date().getTime();
}

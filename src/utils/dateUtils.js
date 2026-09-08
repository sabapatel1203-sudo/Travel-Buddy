/**
 * Calculate dynamic countdown text for a given trip start date string (YYYY-MM-DD)
 * Example output:
 * - "⏳ Trip starts in 20 days"
 * - "🚀 Trip starts today!"
 * - "⏳ Trip starts tomorrow!"
 * - "✨ Trip started 2 days ago"
 */
export function getTripCountdownText(startDateStr) {
  if (!startDateStr) return null;
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return `⏳ Trip starts in ${diffDays} days`;
  } else if (diffDays === 1) {
    return `⏳ Trip starts tomorrow!`;
  } else if (diffDays === 0) {
    return `🚀 Trip starts today!`;
  } else {
    return `✨ Trip started ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  }
}

/**
 * Get a default future date formatted as YYYY-MM-DD (e.g. 20 days in the future)
 */
export function getFutureDateStr(daysFromNow = 20) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

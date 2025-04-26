/**
 * Formats a date string to display time in 12-hour format (e.g., "3:30 PM")
 */
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Formats a date string to display date in locale format (e.g., "3/14/2024")
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

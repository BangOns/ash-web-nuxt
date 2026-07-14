/**
 * Format date string into Indonesian locale (e.g. "14 Juli 2026")
 * Handles invalid or empty dates gracefully.
 */
export const formatDateId = (dateStr: string | Date | undefined | null): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (err) {
    console.error("formatDateId error:", err);
    return "";
  }
};

export const useAnnouncementsManagement = async () => {
  const { data: announcements } = await useAnnouncementsApi().getAnnouncements();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return {
    announcements,
    formatDate,
  };
};

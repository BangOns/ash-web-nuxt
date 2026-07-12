export const useNewsManagement = async () => {
  const { data: newsData } = await useNewsApi().getNews();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return {
    newsData,
    formatDate,
  };
};

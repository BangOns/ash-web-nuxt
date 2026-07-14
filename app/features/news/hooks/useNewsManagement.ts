export const useNewsManagement = async () => {
  const { data: newsData } = await useNewsApi().getNews();

  const formatDate = (dateStr: string) => formatDateId(dateStr);


  return {
    newsData,
    formatDate,
  };
};

import { useRoute } from "vue-router";

export const useNewsDetailManagement = async () => {
  const route = useRoute();
  const id = route.params.id as string;

  const { data: article } = await useNewsApi().getSingleNews(id);

  const formatDate = (dateStr: string) => formatDateId(dateStr);


  return {
    article,
    formatDate,
  };
};

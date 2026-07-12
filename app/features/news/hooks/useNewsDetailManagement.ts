import { useRoute } from "vue-router";

export const useNewsDetailManagement = async () => {
  const route = useRoute();
  const id = route.params.id as string;

  const { data: article } = await useNewsApi().getSingleNews(id);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return {
    article,
    formatDate,
  };
};

import { ref } from "vue";

export const useSuggestionsManagement = () => {
  const submitted = ref(false);
  const rating = ref(0);
  const hoverRating = ref(0);

  const handleSubmit = () => {
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
      rating.value = 0;
    }, 5000);
  };

  return {
    submitted,
    rating,
    hoverRating,
    handleSubmit,
  };
};

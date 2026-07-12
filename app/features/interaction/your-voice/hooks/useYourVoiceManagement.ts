import { ref } from "vue";

export const useYourVoiceManagement = () => {
  const submitted = ref(false);

  const handleSubmit = () => {
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
    }, 5000);
  };

  return {
    submitted,
    handleSubmit,
  };
};

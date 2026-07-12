import { ref, provide } from "vue";
import { useForm } from "@tanstack/vue-form";
import { yourVoiceSchema, initialValues } from "../model";

export const useYourVoiceForm = () => {
  const submitted = ref(false);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: yourVoiceSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Aspirasi submitted:", value);
      submitted.value = true;
      setTimeout(() => {
        submitted.value = false;
        form.reset();
      }, 5000);
    },
  });

  provide("formContext", form);

  return {
    form,
    submitted,
  };
};

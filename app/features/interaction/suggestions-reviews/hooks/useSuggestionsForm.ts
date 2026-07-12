import { ref, provide } from "vue";
import { useForm } from "@tanstack/vue-form";
import { suggestionSchema, initialValues } from "../model";

export const useSuggestionsForm = () => {
  const submitted = ref(false);
  const hoverRating = ref(0);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: suggestionSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
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
    hoverRating,
  };
};

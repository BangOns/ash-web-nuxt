import { ref, provide } from "vue";
import { useForm } from "@tanstack/vue-form";
import { surveySchema, initialValues } from "../model";

export const useSurveyForm = () => {
  const submitted = ref(false);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: surveySchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Survey submitted:", value);
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

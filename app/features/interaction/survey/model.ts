import z from "zod";

export const surveySchema = z.object({
  name: z.string().optional(),
  status: z.string().min(1, "Status wajib dipilih"),
  satisfaction: z.string().min(1, "Tingkat kepuasan wajib diisi"),
  feedback: z.string().optional(),
});

export type TSurveyForm = z.infer<typeof surveySchema>;

export const initialValues: TSurveyForm = {
  name: "",
  status: "",
  satisfaction: "",
  feedback: "",
};

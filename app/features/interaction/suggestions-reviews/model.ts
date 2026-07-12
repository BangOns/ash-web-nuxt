import z from "zod";

export const suggestionSchema = z.object({
  rating: z.number().min(1, "Penilaian bintang wajib diisi"),
  name: z.string().optional(),
  message: z.string().min(1, "Pesan / saran wajib diisi"),
});

export type TSuggestionForm = z.infer<typeof suggestionSchema>;

export const initialValues: TSuggestionForm = {
  rating: 0,
  name: "",
  message: "",
};

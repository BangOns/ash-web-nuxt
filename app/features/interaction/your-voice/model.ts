import z from "zod";

export const yourVoiceSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Format email tidak valid").or(z.literal("")),
  topic: z.string().min(1, "Topik aspirasi wajib dipilih"),
  message: z.string().min(5, "Pesan aspirasi minimal 5 karakter"),
  attachment: z.string().optional(),
});

export type TYourVoiceForm = z.infer<typeof yourVoiceSchema>;

export const initialValues: TYourVoiceForm = {
  name: "",
  email: "",
  topic: "",
  message: "",
  attachment: "",
};

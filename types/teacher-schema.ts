import { z } from "zod";

export const TeacherSchema = z.object({
  name: z
    .string()
    .min(3, { message: "أسم الاستاذ يجب ان يكون 3 احرف او اكثر" }),
  image: z.string(),
  material: z.string().min(5, { message: "أكتب احرف أكثر" }),
});

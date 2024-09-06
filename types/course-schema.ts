import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string().min(3, { message: "اسم الدورة يجب أن يكون 3 أحرف أو أكثر" }),
  teacher: z.string(),
  image: z.string().url({ message: "يجب أن يكون رابط صحيح للصورة" }),
  price: z.number().min(0, { message: "السعر يجب أن يكون رقمًا موجبًا" }),
  discount: z.number().min(0).max(100).optional(), // Optional and within a range of 0-100
  stage: z.string(),
  createdAt: z.date().default(() => new Date()), // Default value is current date
});

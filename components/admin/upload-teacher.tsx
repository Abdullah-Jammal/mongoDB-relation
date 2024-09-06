"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { TeacherSchema } from "@/types/teacher-schema";
import { UploadButton } from "@/src/utils/uploadthing";
import { toast } from "sonner";
import { createTeacher } from "@/server/actions/create-teacher";

const UploadTeacher = () => {
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      name: "",
      image: "",
      material: "",
    },
  });
  async function onSubmit(values: z.infer<typeof TeacherSchema>) {
    try {
      await createTeacher(values);
      toast("تم انشاء استاد");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>أسم الاستاذ</FormLabel>
              <FormControl>
                <Input
                  className="w-[50%]"
                  placeholder="محمود البارودي"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>صورة الاستاذ ان وجدت</FormLabel>
              <FormControl>
                <main className="flex bg-blue-500 rounded-lg flex-col items-center justify-between w-fit">
                  <UploadButton
                    className="p-12"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res.length > 0) {
                        const uploadedImageUrl = res[0].url;
                        field.onChange(uploadedImageUrl);
                      }
                      toast("تم تحميل الصورة بنجاح");
                    }}
                    onUploadError={() => {
                      toast("لم يتم تحميل الصورة");
                    }}
                  />
                </main>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>أسم المادة</FormLabel>
              <FormControl>
                <Input className="w-[50%]" placeholder="الكيمياء" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">أضافة الاستاذ</Button>
      </form>
    </Form>
  );
};

export default UploadTeacher;

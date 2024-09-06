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
import { StageSchema } from "@/types/stage-schema";
import { toast } from "sonner";
import { createStage } from "@/server/actions/stage-action";

const UploadStage = () => {
  const form = useForm<z.infer<typeof StageSchema>>({
    resolver: zodResolver(StageSchema),
    defaultValues: {
      name: "",
      material: "",
    },
  });
  async function onSubmit(values: z.infer<typeof StageSchema>) {
    try {
      await createStage(values);
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
              <FormLabel>أسم المادة</FormLabel>
              <FormControl>
                <Input className="w-[50%]" placeholder="الكيمياء" {...field} />
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
              <FormLabel>أسم المرحلة</FormLabel>
              <FormControl>
                <Input
                  className="w-[50%]"
                  placeholder="السادس الاعدادي"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">أضافة مرحلة</Button>
      </form>
    </Form>
  );
};

export default UploadStage;

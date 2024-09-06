"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { UploadButton } from "@/src/utils/uploadthing";
import { z } from "zod";
import { CourseSchema } from "@/types/course-schema";
import { toast } from "sonner";
import { createCourse } from "@/server/actions/course-action";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  stages: {
    _id: string;
    name: string;
    material: string;
    createdAt: string;
  }[];
  teachers: {
    _id: string;
    name: string;
    image: string;
    material: string;
    createdAt: string;
  }[];
}

const UploadCourse = ({ stages, teachers }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      name: "",
      teacher: "",
      image: "",
      price: 0,
      discount: 0 || undefined,
      stage: "",
    },
  });
  async function onSubmit(values: z.infer<typeof CourseSchema>) {
    try {
      await createCourse({
        image: values.image,
        name: values.name,
        price: values.price,
        discount: values.discount,
        stage: values.stage,
        teacher: values.teacher,
      });
      toast("تم انشاء استاد");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Course Name Field */}
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

        {/* Image URL Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>صورة الكورس</FormLabel>
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
        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>السعر</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-[50%]"
                  placeholder="100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount Field */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الخصم</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-[50%]"
                  placeholder="100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Stages */}
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem className="w-[600px]">
              <FormLabel>المرحلة الدراسية</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="أختر المرحلة الدراسية" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teachers */}
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem className="w-[600px]">
              <FormLabel className="block">الاستاذ</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[300px] justify-between"
                    >
                      {value
                        ? teachers.find((teacher) => teacher.name === value)
                            ?.name
                        : "أختر الاستاذ"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="ابحث عن الاستاذ" />
                      <CommandList>
                        <CommandEmpty>لم يتم العثور على الاستاذ</CommandEmpty>
                        <CommandGroup>
                          {teachers.map((teacher) => (
                            <CommandItem
                              key={teacher._id}
                              value={teacher.name}
                              onSelect={(currentValue) => {
                                const selectedTeacher = teachers.find(
                                  (t: { name: string }) =>
                                    t.name === currentValue
                                );
                                if (selectedTeacher) {
                                  setValue(selectedTeacher.name);
                                  field.onChange(selectedTeacher._id); // Update form state with the teacher's ID
                                }
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === teacher.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {teacher.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">أضافة الدورة</Button>
      </form>
    </Form>
  );
};

export default UploadCourse;

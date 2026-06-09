"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { useLanguage } from "@/hooks/use-language";
import { pickContent, parseContent, composeContent } from "@/lib/content-i18n";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const formSchema = z.object({
    descriptionUz: z.string().min(1),
    descriptionRu: z.string().min(1),
  });

  const parsed = parseContent(initialData?.description || "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { descriptionUz: parsed.uz, descriptionRu: parsed.ru },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const description = composeContent({ uz: values.descriptionUz, ru: values.descriptionRu });
      await axios.patch(`/api/courses/${courseId}`, { description });
      toast.success(t.course.descriptionUpdated);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error(t.messages.error);
    }
  };

  const localized = pickContent(initialData.description, lang);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {t.course.description}
        <Button variant="ghost" onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? t.common.cancel : (
            <><Pencil className="h-4 w-4 mr-2" />{t.common.edit}</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", !localized && "text-slate-500 italic")}>
          {localized || t.course.descriptionPlaceholder}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="descriptionUz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>O&apos;zbekcha (UZ)</FormLabel>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder={t.course.descriptionPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionRu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Русский (RU)</FormLabel>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder={t.course.descriptionPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">{t.common.save}</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

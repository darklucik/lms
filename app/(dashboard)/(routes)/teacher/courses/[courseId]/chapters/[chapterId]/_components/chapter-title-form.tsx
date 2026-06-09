"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { pickContent, parseContent, composeContent } from "@/lib/content-i18n";

interface ChapterTitleFormProps {
  initialData: { title: string };
  courseId: string;
  chapterId: string;
}

export const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const formSchema = z.object({
    titleUz: z.string().min(1),
    titleRu: z.string().min(1),
  });

  const parsed = parseContent(initialData.title);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { titleUz: parsed.uz, titleRu: parsed.ru },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const title = composeContent({ uz: values.titleUz, ru: values.titleRu });
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, { title });
      toast.success(t.chapter.titleUpdated);
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error(t.messages.error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {t.chapter.title}
        <Button variant="ghost" onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? t.common.cancel : (
            <><Pencil className="h-4 w-4 mr-2" />{t.common.edit}</>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{pickContent(initialData.title, lang)}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="titleUz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>O&apos;zbekcha (UZ)</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder={t.chapter.titlePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleRu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Русский (RU)</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder={t.chapter.titlePlaceholder} {...field} />
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

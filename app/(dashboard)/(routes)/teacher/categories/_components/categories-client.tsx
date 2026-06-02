"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";

interface CategoriesClientProps {
  initialCategories: Category[];
}

export const CategoriesClient = ({ initialCategories }: CategoriesClientProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onCreate = async () => {
    if (!name.trim()) return;
    try {
      setIsCreating(true);
      const res = await axios.post("/api/categories", { name: name.trim() });
      setCategories((prev) => [...prev, res.data].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
      toast.success("Категория добавлена");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    } finally {
      setIsCreating(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Категория удалена");
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="flex gap-x-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название категории..."
          disabled={isCreating}
          onKeyDown={(e) => e.key === "Enter" && onCreate()}
          className="max-w-sm"
        />
        <Button onClick={onCreate} disabled={isCreating || !name.trim()}>
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {!isCreating && "Добавить"}
        </Button>
      </div>

      {/* Categories list */}
      {categories.length === 0 ? (
        <div className="text-sm text-muted-foreground italic py-4">
          Категорий пока нет. Добавьте первую.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-x-2 bg-violet-50 border border-violet-200 text-violet-700 rounded-full px-4 py-1.5 text-sm font-medium"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>{category.name}</span>
              <button
                onClick={() => onDelete(category.id)}
                disabled={deletingId === category.id}
                className="hover:opacity-75 transition ml-1"
              >
                {deletingId === category.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

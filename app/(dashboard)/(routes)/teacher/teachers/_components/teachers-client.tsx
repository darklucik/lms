"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, Plus, UserCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Teacher {
  id: string;
  userId: string;
  createdAt: Date;
}

export const TeachersClient = ({ initialTeachers }: { initialTeachers: Teacher[] }) => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [userId, setUserId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onAdd = async () => {
    if (!userId.trim()) return;
    try {
      setIsAdding(true);
      const res = await axios.post("/api/teachers", { teacherUserId: userId.trim() });
      setTeachers((prev) => [res.data, ...prev]);
      setUserId("");
      toast.success("Учитель добавлен");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data || "Что-то пошло не так");
    } finally {
      setIsAdding(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      toast.success("Учитель удалён");
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-x-2">
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Clerk User ID (user_...)"
          disabled={isAdding}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          className="max-w-sm font-mono text-sm"
        />
        <Button onClick={onAdd} disabled={isAdding || !userId.trim()}>
          {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
          {!isAdding && "Добавить"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Clerk User ID можно найти в{" "}
        <a href="https://dashboard.clerk.com" target="_blank" className="underline">
          dashboard.clerk.com
        </a>{" "}
        → Users → нажми на пользователя
      </p>

      {teachers.length === 0 ? (
        <p className="text-sm text-muted-foreground italic py-4">
          Учителей пока нет (кроме вас).
        </p>
      ) : (
        <div className="space-y-2">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex items-center gap-x-3 p-3 bg-violet-50 border border-violet-200 rounded-lg"
            >
              <UserCheck className="h-4 w-4 text-violet-600 shrink-0" />
              <code className="text-sm text-violet-700 flex-1">{teacher.userId}</code>
              <button
                onClick={() => onDelete(teacher.id)}
                disabled={deletingId === teacher.id}
                className="hover:opacity-75 transition text-slate-500"
              >
                {deletingId === teacher.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

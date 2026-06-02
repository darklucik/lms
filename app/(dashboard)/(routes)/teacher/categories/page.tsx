import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CategoriesClient } from "./_components/categories-client";

const CategoriesPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Управление категориями</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Добавляйте и удаляйте категории курсов
        </p>
      </div>
      <CategoriesClient initialCategories={categories} />
    </div>
  );
};

export default CategoriesPage;

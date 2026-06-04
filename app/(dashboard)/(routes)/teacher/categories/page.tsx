import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CategoriesClient } from "./_components/categories-client";
import { getT, getLang } from "@/lib/get-lang";

const CategoriesPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const t = getT();
  const lang = getLang();

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  const title = lang === "uz" ? "Kategoriyalarni boshqarish" : "Управление категориями";
  const subtitle = lang === "uz"
    ? "Kurs kategoriyalarini qo'shing va o'chiring"
    : "Добавляйте и удаляйте категории курсов";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <CategoriesClient initialCategories={categories} />
    </div>
  );
};

export default CategoriesPage;

import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";
import { getT } from "@/lib/get-lang";

interface SearchPageProps {
  searchParams: { title: string; categoryId: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const t = getT();

  const [categories, courses] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }).catch(() => []),
    getCourses({ userId, ...searchParams }),
  ]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">{t.nav.catalog}</h1>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;

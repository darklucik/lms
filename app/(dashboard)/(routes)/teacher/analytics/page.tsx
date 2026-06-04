import { getAnalytics } from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getT, getLang } from "@/lib/get-lang";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const t = getT();
  const lang = getLang();

  const { data, totalCourses, publishedCourses, totalStudents } = await getAnalytics(userId);

  const labelPublished = lang === "ru" ? "Опубликовано" : "Nashr etilgan";
  const labelStudents = lang === "ru" ? "Студентов" : "Talabalar";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t.teacher.analytics}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DataCard label={t.nav.courses} value={totalCourses} />
        <DataCard label={labelPublished} value={publishedCourses} />
        <DataCard label={labelStudents} value={totalStudents} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;

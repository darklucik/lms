import { getAnalytics } from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { data, totalCourses, publishedCourses, totalStudents } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DataCard label="Всего курсов" value={totalCourses} />
        <DataCard label="Опубликовано" value={publishedCourses} />
        <DataCard label="Студентов" value={totalStudents} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;

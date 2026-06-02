import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";
import { auth, currentUser } from "@clerk/nextjs";
import { CheckCircle2, Clock, BookOpen, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const user = await currentUser();
  const firstName = user?.firstName || "there";

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
  const totalCourses = completedCourses.length + coursesInProgress.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          {totalCourses > 0
            ? `You are enrolled in ${totalCourses} course${totalCourses > 1 ? "s" : ""}. Keep going!`
            : "Start exploring courses and begin your learning journey."}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard icon={TrendingUp} label="Total Enrolled" numberOfItems={totalCourses} />
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} variant="default" />
        <InfoCard icon={CheckCircle2} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>
      {coursesInProgress.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <Clock className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">Continue learning</h2>
          </div>
          <CoursesList items={coursesInProgress} />
        </div>
      )}
      {completedCourses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Completed</h2>
          </div>
          <CoursesList items={completedCourses} />
        </div>
      )}
      {totalCourses === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-y-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-violet-100 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-lg">No courses yet</p>
            <p className="text-muted-foreground text-sm mt-1">Browse our catalog and start your first course</p>
          </div>
        </div>
      )}
    </div>
  );
}

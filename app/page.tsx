import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "./(dashboard)/_components/navbar";
import Sidebar from "./(dashboard)/_components/sidebar";
import { DashboardContent } from "./(dashboard)/_components/dashboard-content";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const [{ completedCourses, coursesInProgress }, user] = await Promise.all([
    getDashboardCourses(userId),
    clerkClient.users.getUser(userId).catch(() => null),
  ]);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <DashboardContent
          completedCourses={completedCourses}
          coursesInProgress={coursesInProgress}
          firstName={user?.firstName ?? undefined}
        />
      </main>
    </div>
  );
}

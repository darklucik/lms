import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File, Download } from "lucide-react";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";
import { Separator } from "@/components/ui/separator";
import { CompletionBanner } from "./_components/completion-banner";
import { getT } from "@/lib/get-lang";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const t = getT();

  const { chapter, course, attachments, nextChapter, userProgress } =
    await getChapter({ userId, chapterId: params.chapterId, courseId: params.courseId });

  if (!chapter || !course) return redirect("/");

  // Get student name for certificate
  const user = await clerkClient.users.getUser(userId).catch(() => null);
  const studentName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Student";

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label={t.chapter.completedMsg}
        />
      )}

      {/* Completion + Certificate banner */}
      <CompletionBanner
        courseId={params.courseId}
        courseTitle={course.title}
        studentName={studentName}
      />

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            videoUrl={chapter.videoUrl || ""}
            isLocked={false}
            completeOnEnd={!userProgress?.isCompleted}
          />
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-3 py-4">
            <div>
              <h2 className="text-xl font-bold">{chapter.title}</h2>
              {course.title && (
                <p className="text-sm text-muted-foreground mt-0.5">{course.title}</p>
              )}
            </div>
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          </div>
          <Separator />
          {chapter.description && (
            <div className="mt-4">
              <Preview value={chapter.description} />
            </div>
          )}
          {!!attachments.length && (
            <div className="mt-6">
              <Separator className="mb-4" />
              <h3 className="text-sm font-semibold mb-3">{t.course.attachments}</h3>
              <div className="flex flex-col gap-y-2">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center gap-x-3 p-3 w-full bg-violet-50 border border-violet-200 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors text-sm font-medium"
                  >
                    <div className="h-8 w-8 rounded-md bg-violet-100 flex items-center justify-center shrink-0">
                      <File className="h-4 w-4" />
                    </div>
                    <p className="line-clamp-1 flex-1">{attachment.name}</p>
                    <Download className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

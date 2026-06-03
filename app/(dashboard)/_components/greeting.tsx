"use client";

import { useUser } from "@clerk/nextjs";

export const Greeting = ({ totalCourses }: { totalCourses: number }) => {
  const { user } = useUser();
  const firstName = user?.firstName || "";

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">
        С возвращением{firstName ? `, ${firstName}` : ""} 👋
      </h1>
      <p className="text-muted-foreground text-sm">
        {totalCourses > 0
          ? `Вы записаны на ${totalCourses} ${totalCourses === 1 ? "курс" : totalCourses < 5 ? "курса" : "курсов"}. Продолжайте!`
          : "Просмотрите каталог и начните свой первый курс."}
      </p>
    </div>
  );
};

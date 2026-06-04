"use client";

import { BarChart, Compass, Layout, List, Tag, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useLanguage } from "@/hooks/use-language";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const guestRoutes = [
    { icon: Layout, label: t.nav.home, href: "/" },
    { icon: Compass, label: t.nav.catalog, href: "/search" },
  ];

  const teacherRoutes = [
    { icon: List, label: t.nav.courses, href: "/teacher/courses" },
    { icon: Tag, label: t.nav.categories, href: "/teacher/categories" },
    { icon: Users, label: t.nav.teachers, href: "/teacher/teachers" },
    { icon: BarChart, label: t.nav.analytics, href: "/teacher/analytics" },
  ];

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

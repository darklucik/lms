"use client";

import { BarChart, Compass, Layout, List, Tag, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Главная",
    href: "/",
  },
  {
    icon: Compass,
    label: "Каталог",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Курсы",
    href: "/teacher/courses",
  },
  {
    icon: Tag,
    label: "Категории",
    href: "/teacher/categories",
  },
  {
    icon: Users,
    label: "Учителя",
    href: "/teacher/teachers",
  },
  {
    icon: BarChart,
    label: "Аналитика",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

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

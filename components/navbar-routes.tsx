"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isTeacherUser, setIsTeacherUser] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me/is-teacher")
      .then((r) => {
        if (!r.ok) throw new Error("not auth");
        return r.json();
      })
      .then((data) => {
        setUserId(data.userId || "exists");
        setIsTeacherUser(data.isTeacher);
      })
      .catch(() => {
        setUserId(null);
        setIsTeacherUser(false);
      });
  }, []);

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        <LanguageSwitcher />
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              {t.nav.exitCourse}
            </Button>
          </Link>
        ) : isTeacherUser === true ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              {t.nav.teacherMode}
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default NavbarRoutes;

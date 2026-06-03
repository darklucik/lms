"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [isTeacherUser, setIsTeacherUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (userId) {
      fetch("/api/me/is-teacher")
        .then((r) => r.json())
        .then((data) => setIsTeacherUser(data.isTeacher));
    } else {
      setIsTeacherUser(false);
    }
  }, [userId]);

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
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти из курса
            </Button>
          </Link>
        ) : isTeacherUser === true ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Режим преподавателя
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;

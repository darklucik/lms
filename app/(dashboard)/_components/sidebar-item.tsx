"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-3 text-muted-foreground text-sm font-medium pl-5 pr-4 py-3 mx-2 rounded-lg transition-all hover:text-foreground hover:bg-secondary w-[calc(100%-16px)]",
        isActive &&
          "text-violet-700 bg-violet-50 hover:bg-violet-50 hover:text-violet-700 font-semibold"
      )}
    >
      <Icon
        size={20}
        className={cn("shrink-0 text-muted-foreground", isActive && "text-violet-600")}
      />
      <span className="truncate">{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600" />
      )}
    </button>
  );
};

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { translations } from "@/lib/i18n";

function getT() {
  if (typeof window === "undefined") return translations.uz;
  const lang = localStorage.getItem("lang") === "ru" ? "ru" : "uz";
  return translations[lang];
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      const t = getT();
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.teacher.titleCol} <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      const t = getT();
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.teacher.status} <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const t = getT();
      const isPublished = row.getValue("isPublished") || false;
      const draft = typeof window !== "undefined" && localStorage.getItem("lang") === "ru" ? "Черновик" : "Qoralama";
      const pub = typeof window !== "undefined" && localStorage.getItem("lang") === "ru" ? "Опубликован" : "Nashr etilgan";
      return (
        <Badge className={cn("bg-slate-500", isPublished && "bg-violet-600")}>
          {isPublished ? pub : draft}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const edit = typeof window !== "undefined" && localStorage.getItem("lang") === "ru" ? "Редактировать" : "Tahrirlash";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                {edit}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

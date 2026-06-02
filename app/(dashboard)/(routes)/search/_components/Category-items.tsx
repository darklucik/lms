"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-1.5 px-3.5 text-sm border rounded-full flex items-center gap-x-1.5 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all whitespace-nowrap font-medium",
        isSelected
          ? "border-violet-600 bg-violet-600 text-white hover:bg-violet-700 hover:border-violet-700 hover:text-white"
          : "border-border text-muted-foreground"
      )}
    >
      {Icon && <Icon size={16} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;

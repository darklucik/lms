import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

const InfoCard = ({ variant, icon: Icon, numberOfItems, label }: InfoCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-4 flex items-center gap-x-4 hover:shadow-sm transition-shadow">
      <div
        className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
          variant === "success" ? "bg-emerald-100" : "bg-violet-100"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            variant === "success" ? "text-emerald-600" : "text-violet-600"
          )}
        />
      </div>
      <div>
        <p className="text-2xl font-bold">{numberOfItems}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default InfoCard;

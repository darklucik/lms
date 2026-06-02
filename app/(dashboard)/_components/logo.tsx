import { BookOpen } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center">
        <BookOpen className="h-4 w-4 text-white" />
      </div>
      <span className="font-bold text-lg tracking-tight text-foreground">LearnFlow</span>
    </div>
  );
};

export default Logo;

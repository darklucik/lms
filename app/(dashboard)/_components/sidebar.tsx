import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 border-b">
        <Logo />
      </div>
      <div className="flex flex-col w-full flex-1 py-4">
        <SidebarRoutes />
      </div>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center">MTLearning</p>
      </div>
    </div>
  );
};

export default Sidebar;

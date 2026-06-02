"use client";

import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="px-4 border-b h-full flex items-center bg-white shadow-sm gap-x-4">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

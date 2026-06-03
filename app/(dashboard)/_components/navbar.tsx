"use client";

import dynamic from "next/dynamic";
import { MobileSidebar } from "./mobile-sidebar";

const NavbarRoutes = dynamic(() => import("@/components/navbar-routes"), {
  ssr: false,
});

export const Navbar = () => {
  return (
    <div className="px-4 border-b h-full flex items-center bg-white shadow-sm gap-x-4">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

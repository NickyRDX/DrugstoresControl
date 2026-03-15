"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AppSidebar from "@/shared/components/AppSidebar/AppSidebar";
import { ModeToggle } from "@/shared/components/ModeToggle";
import React from "react";
type LayoutPrincipalProps = {
  children: React.ReactNode;
};
export default function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  return (
    <main className={cn("w-full relative min-h-full")}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <nav className="w-full h-14 p-2 border-b border-slate-700/10 dark:border-slate-100/20 flex justify-between items-center">
            <SidebarTrigger className="cursor-pointer" />
            <div>
              <ModeToggle />
            </div>
          </nav>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}

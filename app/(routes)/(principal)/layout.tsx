"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AppSidebar from "@/shared/components/AppSidebar/AppSidebar";
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
          <SidebarTrigger className="cursor-pointer" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}

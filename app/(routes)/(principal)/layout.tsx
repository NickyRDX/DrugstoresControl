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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
type LayoutPrincipalProps = {
  children: React.ReactNode;
};
export default function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "(principal)");
  return (
    <main className={cn("w-full relative min-h-full")}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <nav className="w-full h-14 p-5 border-b border-slate-800/20 dark:border-slate-100/30 flex justify-between items-center sticky z-50 top-0 inset-x-0 backdrop-blur-lg overflow-hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="cursor-pointer rounded-full" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-default" href="/dashboard">Inicio</BreadcrumbLink>
                  </BreadcrumbItem>
                  {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const label = segment
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase()); // "stock-actual" -> "Stock Actual"
                    const isLast = index === segments.length - 1;
                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="cursor-default">{label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
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

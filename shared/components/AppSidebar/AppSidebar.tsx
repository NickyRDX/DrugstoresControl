"use client";
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarDato } from "./Sidebar.data";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {logout} from '@/action/auth'
import { Button } from '@/components/ui/button';
import { LogInIcon } from 'lucide-react';

function LogoutButton() {
  logout()
}

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="border-r-black/10 dark:border-r-white/10">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4 group-data-[collapsible=icon]:justify-center">
          <div className="flex aspect-square size-9 items-center justify-center rounded-lg overflow-hidden">
            <Image 
              src="/images/Logo.svg" 
              alt="Logo" 
              width={28} 
              height={28} 
              quality={100}
              className="object-contain"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-slate-700 dark:text-slate-200 tracking-tight text-base">Drugstore Controls</span>
            <span className="truncate text-xs text-muted-foreground font-medium">Control Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm tracking-tighter text-muted-foreground font-semibold mb-2">Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarDato.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.id} className="mb-2.5">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.nombre}
                      className={cn(
                        "h-11 transition-all duration-200 ease-in-out",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" 
                          : "hover:bg-sidebar-accent/50"
                      )}
                    >
                      <Link href={item.href} className="flex items-center-safe gap-3">
                        <item.icon className={cn("size-6! stroke-1", isActive && "text-primary")} />
                        <span className="text-lg text-slate-700 dark:text-slate-200 group-data-[collapsible=icon]:hidden">
                          {item.nombre}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <div className="p-2 group-data-[collapsible=icon]:hidden">
          <div className="rounded-lg bg-sidebar-accent/50 p-3 text-xs text-muted-foreground">
            © 2026 Drugstore Control
          </div>
        </div> */}
        <Button variant='secondary' onClick={LogoutButton} className='p-2.5 cursor-pointer h-10 group-data-[collapsible=icon]:hidden'>
          Cerrar sesión
          <LogInIcon className="size-4 mt-0.5"/>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

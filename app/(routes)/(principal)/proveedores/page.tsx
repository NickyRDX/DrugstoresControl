"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

export default function ProveedoresPage() {
  return (
    <section className="p-3">
      <div className="flex justify-between w-full">
        <h1 className='md:text-xl text-slate-800 dark:text-slate-200 font-medium tracking-tight leading-relaxed text-pretty text-base md:leading-relaxed'>Bienvenido a la sección de proveedores</h1>
        <Button className="w-fit h-10 cursor-pointer text-sm font-semibold rounded-sm text-slate-700 dark:text-slate-200 leading-tight tracking-tight" variant="outline">Agendar Proveedores
          <PlusCircle/>
        </Button>
      </div>
    </section>
  );
}

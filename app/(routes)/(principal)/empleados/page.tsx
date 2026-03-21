"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";


export default function EmpleadosPage() {
  return (
    <section className="p-3">
      <div className="flex justify-end">
        <Button
          className="w-fit h-10 cursor-pointer text-sm font-semibold rounded-sm text-slate-200 leading-tight tracking-tighter"
        >
          Empleado
          <PlusCircleIcon className="size-4 stroke-3" />
        </Button>
      </div>
    </section>
  );
}

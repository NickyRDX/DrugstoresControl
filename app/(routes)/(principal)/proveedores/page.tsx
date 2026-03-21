"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

export default function ProveedoresPage() {
  return (
    <section className="p-3">
      <div className="flex justify-end w-full">
        <Button className="w-fit h-10 cursor-pointer text-sm font-semibold rounded-sm leading-tight tracking-tighter" variant="default">Agregar Proveedores
          <PlusCircle/>
        </Button>
      </div>
    </section>
  );
}

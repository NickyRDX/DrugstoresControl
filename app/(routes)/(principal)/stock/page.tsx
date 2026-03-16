"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function StockPage() {
  return (
    <section className="p-3">
      <div className="flex justify-end">
        <Button className="w-fit h-10 cursor-pointer rounded-sm text-slate-200 leading-tight tracking-tight">Agregar Producto <PlusIcon className="size-4 stroke-3" /> </Button>
      </div>
    </section>
  );
}

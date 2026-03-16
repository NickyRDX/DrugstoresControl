"use client";
import CardComponent from "@/shared/components/CardComponent/CardComponent";
import { ChartAreaStacked } from "@/shared/components/ChartStacked";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-8 p-6 max-w-[1600px] mx-auto w-full">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <CardComponent />
        </div>
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </section>
      <section className="gap-6 min-h-full">
        <ChartAreaStacked />
      </section>
    </section>
  );
}

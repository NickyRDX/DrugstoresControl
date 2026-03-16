"use client";
import CardComponent from "@/shared/components/CardComponent/CardComponent";
import CardStock from "@/shared/components/CardStock/CardStock";
import { ChartAreaStacked } from "@/shared/components/ChartStacked";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-8 p-3 max-w-[1600px] mx-auto w-full">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <CardComponent />
        </div>
        <CardStock />
        <CardComponent />
        <CardComponent />
      </section>
      <section className="gap-6">
        <ChartAreaStacked />
      </section>
    </section>
  );
}

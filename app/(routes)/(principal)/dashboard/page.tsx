"use client";
import CardComponent from "@/shared/components/CardComponent/CardComponent";
import React from "react";

export default function DashboardPage() {
  return (
    <section className="p-6 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1600px] mx-auto">
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
    </section>
  );
}

"use client";
import { ModeToggle } from '@/shared/components/ModeToggle';
import React from 'react'
type AuthLayoutProps = {
  children: React.ReactNode
}
export default function LayoutAutenticacion({children}: AuthLayoutProps) {
  return (
    <main className='w-full relative mx-auto flex flex-col h-full'>
      <nav className='px-4 py-2 flex justify-end-safe'>
        <ModeToggle/>
      </nav>
      <section className='flex flex-1 w-full justify-center items-center p-4'>
        {children}
      </section>
    </main>
  )
}

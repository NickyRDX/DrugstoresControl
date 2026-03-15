"use client";
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon } from 'lucide-react';
export default function CardComponent() {
  return (
    <Card className='border-muted-foreground/20 border w-full max-w-xs'>
      <CardHeader>
        <CardDescription>
          Capital Ingresado
        </CardDescription>
        <CardTitle>
          AR$ 100.000
        </CardTitle>
        <CardAction>
          <Badge variant={`outline`}>
            <TrendingUpIcon className='size-4 text-green-400'/>
            AR$
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

import * as React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = { 
  sm: 'w-6 h-6', 
  md: 'w-7 h-7', 
  lg: 'w-9 h-9' 
}

export function ColorSwatch({ color, size = 'md', className }: Props) {
  return (
    <div
      className={cn(
        'shrink-0 border-2 border-[rgb(var(--neo-text))] shadow-neo',
        'rounded-none', 
        sizeMap[size], 
        className
      )}
      style={{ background: color }}
      aria-hidden
    />
  )
}
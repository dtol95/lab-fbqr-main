"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const BrutalistSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden bg-[var(--neo-interactive-bg)] border-2 border-[var(--neo-text)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--neo-accent)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-7 w-7 border-2 border-[var(--neo-text)] bg-[var(--neo-accent)] neo-shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neo-text)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:neo-shadow-hover cursor-pointer" />
  </SliderPrimitive.Root>
))
BrutalistSlider.displayName = SliderPrimitive.Root.displayName

export { BrutalistSlider }

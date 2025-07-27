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
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden bg-[var(--neo-interactive-bg)] border-2 border-[var(--neo-text)]">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--neo-accent)] border-r-2 border-[var(--neo-text)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-7 w-7 border-2 border-[var(--neo-text)] bg-[var(--neo-accent)] neo-shadow transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 hover:neo-shadow-hover cursor-pointer data-[state=active]:opacity-100 relative z-10" />
  </SliderPrimitive.Root>
))
BrutalistSlider.displayName = SliderPrimitive.Root.displayName

export { BrutalistSlider }

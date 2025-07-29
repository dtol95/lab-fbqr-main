"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tooltipVariants = cva(
  "z-[var(--z-tooltip)] overflow-hidden border-2 border-[var(--neo-text)] bg-[var(--neo-bg)] px-3 py-1.5 text-xs font-medium shadow-neo animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--neo-bg)] text-[var(--neo-text)]",
        accent: "bg-[var(--neo-accent)] text-[var(--neo-on-accent)]",
        destructive: "bg-[var(--neo-destructive)] text-[var(--neo-on-destructive)]",
        success: "bg-[var(--neo-success)] text-[var(--neo-on-success)]",
        warning: "bg-[var(--neo-warning)] text-[var(--neo-on-warning)]",
        info: "bg-[var(--neo-info)] text-[var(--neo-on-info)]",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const BrutalistTooltipProvider = TooltipPrimitive.Provider

const BrutalistTooltip = TooltipPrimitive.Root

const BrutalistTooltipTrigger = TooltipPrimitive.Trigger

const BrutalistTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & 
    VariantProps<typeof tooltipVariants>
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant, size }), className)}
    {...props}
  />
))
BrutalistTooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simple Tooltip Wrapper
interface SimpleTooltipProps {
  content: React.ReactNode
  variant?: VariantProps<typeof tooltipVariants>["variant"]
  size?: VariantProps<typeof tooltipVariants>["size"]
  side?: "top" | "right" | "bottom" | "left"
  children: React.ReactNode
  delayDuration?: number
}

const SimpleTooltip = React.forwardRef<
  React.ElementRef<typeof BrutalistTooltipContent>,
  SimpleTooltipProps
>(({ content, variant, size, side = "top", children, delayDuration = 200 }, ref) => (
  <BrutalistTooltipProvider delayDuration={delayDuration}>
    <BrutalistTooltip>
      <BrutalistTooltipTrigger asChild>
        {children}
      </BrutalistTooltipTrigger>
      <BrutalistTooltipContent
        ref={ref}
        side={side}
        variant={variant}
        size={size}
      >
        {content}
      </BrutalistTooltipContent>
    </BrutalistTooltip>
  </BrutalistTooltipProvider>
))
SimpleTooltip.displayName = "SimpleTooltip"

export {
  BrutalistTooltip,
  BrutalistTooltipTrigger,
  BrutalistTooltipContent,
  BrutalistTooltipProvider,
  SimpleTooltip,
}
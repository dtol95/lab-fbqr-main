"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const popoverContentVariants = cva(
  "z-[var(--z-overlay)] border-2 border-[var(--neo-text)] bg-[var(--neo-bg)] shadow-neo-large outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        sm: "w-56 p-3",
        default: "w-72 p-4",
        lg: "w-96 p-6",
        xl: "w-[32rem] p-6",
        auto: "max-w-md p-4",
      },
      variant: {
        default: "bg-[var(--neo-bg)] text-[var(--neo-text)]",
        accent: "bg-[var(--neo-accent)] text-[var(--neo-on-accent)]",
        muted: "bg-[var(--neo-muted-bg)] text-[var(--neo-text)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & 
    VariantProps<typeof popoverContentVariants>
>(({ className, align = "center", sideOffset = 4, size, variant, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ size, variant }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverClose = PopoverPrimitive.Close

const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 pb-2 border-b border-[var(--neo-text)]", className)}
    {...props}
  />
))
PopoverHeader.displayName = "PopoverHeader"

const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("font-medium leading-none font-bold uppercase", className)}
    {...props}
  />
))
PopoverTitle.displayName = "PopoverTitle"

const PopoverBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
))
PopoverBody.displayName = "PopoverBody"

const PopoverFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2 pt-2 border-t border-[var(--neo-text)] flex justify-end gap-2", className)}
    {...props}
  />
))
PopoverFooter.displayName = "PopoverFooter"

export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverClose,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
}

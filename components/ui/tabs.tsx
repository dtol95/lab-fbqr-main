"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tabsListVariants = cva(
  "grid h-auto border-2 border-neo-text bg-transparent p-0",
  {
    variants: {
      variant: {
        default: "",
        pills: "gap-1 bg-[var(--neo-interactive-bg)] p-1",
        underline: "border-0 border-b-2 border-[var(--neo-text)] bg-transparent",
      },
      orientation: {
        horizontal: "",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
)

const tabsTriggerVariants = cva(
  "flex items-center justify-center whitespace-nowrap p-4 text-base font-bold uppercase font-sans text-neo-text transition-all focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-r-2 border-neo-text last:border-r-0 data-[state=active]:bg-neo-accent data-[state=active]:text-neo-on-accent hover:bg-neo-interactive-bg",
        pills: "border-0 rounded-none data-[state=active]:bg-[var(--neo-accent)] data-[state=active]:text-neo-on-accent hover:bg-[var(--neo-accent)]/20",
        underline: "border-0 border-b-2 border-transparent data-[state=active]:border-[var(--neo-accent)] data-[state=active]:bg-transparent hover:bg-[var(--neo-accent)]/10",
      },
      orientation: {
        horizontal: "",
        vertical: "border-r-0 border-b-2 border-neo-text last:border-b-0 w-full justify-start",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        default: "p-4 text-base",
        lg: "px-6 py-4 text-lg",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        orientation: "vertical",
        className: "border-r-0 border-b-2 border-neo-text last:border-b-0 data-[state=active]:bg-neo-accent data-[state=active]:text-neo-on-accent",
      },
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "default",
    },
  }
)

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant, orientation, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, orientation }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, orientation, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, orientation, size }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    padding?: "none" | "sm" | "default" | "lg"
  }
>(({ className, padding = "default", ...props }, ref) => {
  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    default: "p-4",
    lg: "p-6",
  }

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-0 border-2 border-t-0 border-neo-text bg-[var(--neo-bg)] focus-ring",
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

// Enhanced Tabs with Badge Support
const TabsWithBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    badge?: React.ReactNode
  }
>(({ className, badge, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex items-center", className)} {...props}>
    {children}
    {badge && (
      <span className="ml-2 inline-flex items-center">
        {badge}
      </span>
    )}
  </div>
))
TabsWithBadge.displayName = "TabsWithBadge"

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsWithBadge }

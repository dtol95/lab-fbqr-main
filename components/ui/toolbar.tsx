"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toolbarVariants = cva(
  "flex border-2 border-neo-text bg-neo-bg",
  {
    variants: {
      variant: {
        default: "shadow-neo",
        elevated: "shadow-neo-large",
        flat: "shadow-none",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "gap-0",
        default: "gap-0",
        lg: "gap-0",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "default",
    },
  }
)

const toolbarItemVariants = cva(
  "flex items-center justify-center neo-border-none neo-shadow-none hover-accent focus-ring transition-neo",
  {
    variants: {
      orientation: {
        horizontal: "border-r-2 border-neo-text last:border-r-0",
        vertical: "border-b-2 border-neo-text last:border-b-0",
      },
      size: {
        sm: "h-8 w-8 p-1",
        default: "h-10 w-10 p-2",
        lg: "h-12 w-12 p-3",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "default",
    },
  }
)

export interface ToolbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolbarVariants> {
  orientation?: "horizontal" | "vertical"
}

export interface ToolbarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toolbarItemVariants> {
  asChild?: boolean
}

export interface ToolbarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, variant, orientation, size, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn(toolbarVariants({ variant, orientation, size }), className)}
      {...props}
    />
  )
)
Toolbar.displayName = "Toolbar"

const ToolbarItem = React.forwardRef<HTMLButtonElement, ToolbarItemProps>(
  ({ className, orientation, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "button"
    
    return (
      <Comp
        ref={ref}
        className={cn(toolbarItemVariants({ orientation, size }), className)}
        {...props}
      />
    )
  }
)
ToolbarItem.displayName = "ToolbarItem"

const ToolbarSeparator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "bg-neo-text",
        orientation === "horizontal" ? "w-px h-full" : "h-px w-full",
        className
      )}
      {...props}
    />
  )
)
ToolbarSeparator.displayName = "ToolbarSeparator"

const ToolbarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
)
ToolbarGroup.displayName = "ToolbarGroup"

export { 
  Toolbar, 
  ToolbarItem, 
  ToolbarSeparator, 
  ToolbarGroup,
  toolbarVariants,
  toolbarItemVariants 
}
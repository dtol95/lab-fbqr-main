import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "neo-card", // Base brutalist card styling from globals.css
  {
    variants: {
      variant: {
        default: "",
        elevated: "neo-shadow-large",
        flat: "neo-shadow-none",
      },
      shadow: {
        default: "neo-shadow",
        large: "neo-shadow-large", 
        none: "neo-shadow-none",
      },
      interaction: {
        default: "transition-neo", // Standard card with basic transitions
        static: "", // No interactions at all
        enhanced: "neo-enhanced hover:shadow-[6px_6px_0px_var(--neo-text)] hover:transform-neo-hover", // Enhanced hover interactions
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "large", // Default to large shadow like NeoCard
      interaction: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  noShadow?: boolean // Backward compatibility
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, shadow, interaction, noShadow = false, ...props }, ref) => {
    // Handle backward compatibility with noShadow prop
    const effectiveShadow = noShadow ? "none" : shadow

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant,
            shadow: effectiveShadow, 
            interaction,
            className
          })
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight neo-text-bold",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground neo-text", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

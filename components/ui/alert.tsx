import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full border-2 border-neo-text p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neo-text",
  {
    variants: {
      variant: {
        default: "bg-neo-accent text-neo-text [&>svg]:text-neo-text",
        destructive: "bg-[var(--neo-destructive)] text-[var(--neo-on-destructive)] [&>svg]:text-[var(--neo-on-destructive)]",
        success: "bg-[var(--neo-success)] text-[var(--neo-on-success)] [&>svg]:text-[var(--neo-on-success)]",
        warning: "bg-[var(--neo-warning)] text-[var(--neo-on-warning)] [&>svg]:text-[var(--neo-on-warning)]",
        info: "bg-[var(--neo-info)] text-[var(--neo-on-info)] [&>svg]:text-[var(--neo-on-info)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

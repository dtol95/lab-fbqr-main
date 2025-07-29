import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border-2 border-neo-text px-2.5 py-0.5 text-xs font-bold uppercase transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-neo-accent text-neo-text hover:opacity-90",
        secondary: "bg-neo-muted text-neo-text hover:opacity-90",
        destructive: "bg-[var(--neo-destructive)] text-[var(--neo-on-destructive)] hover:opacity-90",
        success: "bg-[var(--neo-success)] text-[var(--neo-on-success)] hover:opacity-90",
        warning: "bg-[var(--neo-warning)] text-[var(--neo-on-warning)] hover:opacity-90",
        info: "bg-[var(--neo-info)] text-[var(--neo-on-info)] hover:opacity-90",
        outline: "bg-transparent text-neo-text hover:bg-neo-interactive border-dashed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

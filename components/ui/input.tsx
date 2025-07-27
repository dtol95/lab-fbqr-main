import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "neo-input flex h-11 w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[var(--neo-interactive-bg)]",
        outline: "bg-transparent",
        ghost: "bg-transparent neo-border-none",
      },
      shadow: {
        default: "neo-shadow",
        large: "neo-shadow-large", 
        none: "neo-shadow-none",
      },
      interaction: {
        default: "transition-neo hover:shadow-[var(--neo-shadow-hover)] hover:transform-neo-hover focus-visible:shadow-[var(--neo-shadow-active)] focus-visible:transform-neo-active disabled:opacity-[var(--neo-opacity-disabled)]",
        static: "neo-static",
        enhanced: "neo-enhanced focus-visible:shadow-[var(--neo-shadow-hover)] focus-visible:transform-neo-active",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "default", 
      interaction: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  noShadow?: boolean // Backward compatibility
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, shadow, interaction, type, noShadow = false, ...props }, ref) => {
    // Handle backward compatibility with noShadow prop
    const effectiveShadow = noShadow ? "none" : shadow
    
    // Override interaction for ghost variant to prevent unwanted shadows/interactions
    const effectiveInteraction = variant === "ghost" ? "static" : interaction

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ 
            variant, 
            shadow: effectiveShadow, 
            interaction: effectiveInteraction,
            className 
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }

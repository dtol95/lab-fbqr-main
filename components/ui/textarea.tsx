import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "neo-input flex min-h-[80px] w-full px-3 py-2 text-base placeholder:text-muted-foreground/70 focus-visible:outline-none disabled:cursor-not-allowed resize-none",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  noShadow?: boolean // Backward compatibility
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, shadow, interaction, noShadow = false, ...props }, ref) => {
    // Handle backward compatibility with noShadow prop
    const effectiveShadow = noShadow ? "none" : shadow
    
    // Override interaction for ghost variant to prevent unwanted shadows/interactions
    const effectiveInteraction = variant === "ghost" ? "static" : interaction

    return (
      <textarea
        className={cn(
          textareaVariants({ 
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
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }

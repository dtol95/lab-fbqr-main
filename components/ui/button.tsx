import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "neo-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--neo-accent)] text-[var(--neo-text)] hover:bg-[var(--neo-accent)]/90",
        destructive: "bg-[hsl(var(--neo-destructive-accent))] text-[var(--neo-text)] hover:bg-[hsl(var(--neo-destructive-accent),0.9)]",
        outline: "bg-transparent hover:bg-[var(--neo-text)]/5",
        secondary: "bg-[var(--neo-interactive-bg)] text-[var(--neo-text)] hover:bg-[var(--neo-bg)]",
        ghost: "neo-border-none neo-shadow-none hover:bg-accent hover:text-accent-foreground",
        link: "neo-border-none neo-shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 px-3 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
      },
      shadow: {
        default: "neo-shadow",
        large: "neo-shadow-large",
        none: "neo-shadow-none",
      },
      interaction: {
        default: "neo-interactive",
        static: "neo-static",
        enhanced: "neo-enhanced",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "default",
      interaction: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  noShadow?: boolean // Backward compatibility
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shadow, interaction, asChild = false, noShadow = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Handle backward compatibility with noShadow prop
    const effectiveShadow = noShadow ? "none" : shadow
    
    // Override interaction for ghost and link variants to prevent unwanted shadows/interactions
    const effectiveInteraction = (variant === "ghost" || variant === "link") ? "static" : interaction

    return (
      <Comp
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
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
Button.displayName = "Button"

export { Button, buttonVariants }

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AnimatedBrutalistXIcon } from "./animated-brutalist-x-icon"

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-transparent opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-neo-text/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1 rounded",
          className
        )}
        {...props}
      >
        <AnimatedBrutalistXIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    )
  }
)

CloseButton.displayName = "CloseButton"

export { CloseButton }
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
          "border-2 border-neo-text bg-neo-bg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1",
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
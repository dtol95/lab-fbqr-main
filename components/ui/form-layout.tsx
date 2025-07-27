"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("neo-form-section", className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-neo-sm mb-6">
            {title && (
              <h3 className="font-heading text-xl font-bold uppercase">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, columns = 1, children, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "neo-form-group",
          "grid",
          gridCols[columns],
          "gap-neo-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormGroup.displayName = "FormGroup"

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "neo-form-field",
          "space-neo-sm",
          error && "text-destructive",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormField.displayName = "FormField"

const FormControls = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap",
          "gap-neo-sm",
          "pt-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormControls.displayName = "FormControls"

export interface ColorControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

const ColorControls = React.forwardRef<HTMLDivElement, ColorControlsProps>(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    const directionClass = direction === "horizontal" 
      ? "flex items-center gap-neo-sm" 
      : "space-neo-sm"
    
    return (
      <div
        ref={ref}
        className={cn(directionClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ColorControls.displayName = "ColorControls"

export interface ColorGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

const ColorGrid = React.forwardRef<HTMLDivElement, ColorGridProps>(
  ({ className, columns = 2, children, ...props }, ref) => {
    const gridClass = {
      2: "grid-cols-2",
      3: "grid-cols-3", 
      4: "grid-cols-4"
    }[columns]
    
    return (
      <div
        ref={ref}
        className={cn("grid gap-neo-sm", gridClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ColorGrid.displayName = "ColorGrid"

export { FormSection, FormGroup, FormField, FormControls, ColorControls, ColorGrid }
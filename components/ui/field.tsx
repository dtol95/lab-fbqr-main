"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, Check, X } from "lucide-react"

// Field Context
interface FieldContextValue {
  id: string
  required: boolean
  disabled: boolean
  readonly: boolean
  invalid: boolean
  optional: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

const useFieldContext = () => {
  const context = React.useContext(FieldContext)
  if (!context) {
    throw new Error("Field components must be used within a Field component")
  }
  return context
}

// Field Variants
const fieldVariants = cva(
  "space-neo-sm",
  {
    variants: {
      state: {
        default: "",
        invalid: "text-destructive",
        valid: "text-success",
        disabled: "opacity-50",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

const fieldLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      required: {
        true: "after:content-['*'] after:text-destructive after:ml-1",
        false: "",
      },
      optional: {
        true: "after:content-['(optional)'] after:text-muted-foreground after:ml-1 after:text-xs after:font-normal",
        false: "",
      },
    },
    defaultVariants: {
      required: false,
      optional: false,
    },
  }
)

const fieldControlVariants = cva(
  "relative flex items-center",
  {
    variants: {
      hasStartAdornment: {
        true: "",
        false: "",
      },
      hasEndAdornment: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      hasStartAdornment: false,
      hasEndAdornment: false,
    },
  }
)

const fieldHelpVariants = cva(
  "text-xs text-muted-foreground",
  {
    variants: {
      state: {
        default: "text-muted-foreground",
        invalid: "text-destructive",
        valid: "text-success",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

// Field Root Component
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  optional?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, required = false, disabled = false, readonly = false, invalid = false, optional = false, children, ...props }, ref) => {
    const id = React.useId()
    
    const contextValue: FieldContextValue = {
      id,
      required,
      disabled,
      readonly,
      invalid,
      optional,
    }

    const state = invalid ? "invalid" : disabled ? "disabled" : "default"

    return (
      <FieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(fieldVariants({ state }), className)}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    )
  }
)
Field.displayName = "Field"

// Field Label Component
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { id, required, optional } = useFieldContext()
    
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(fieldLabelVariants({ required, optional }), className)}
        {...props}
      >
        {children}
      </label>
    )
  }
)
FieldLabel.displayName = "FieldLabel"

// Field Control Component
export interface FieldControlProps extends React.HTMLAttributes<HTMLDivElement> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
  ({ className, startAdornment, endAdornment, children, ...props }, ref) => {
    const hasStartAdornment = Boolean(startAdornment)
    const hasEndAdornment = Boolean(endAdornment)

    return (
      <div
        ref={ref}
        className={cn(fieldControlVariants({ hasStartAdornment, hasEndAdornment }), className)}
        {...props}
      >
        {startAdornment && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
            {startAdornment}
          </div>
        )}
        <div className={cn(
          "flex-1",
          hasStartAdornment && "pl-10",
          hasEndAdornment && "pr-10"
        )}>
          {children}
        </div>
        {endAdornment && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
            {endAdornment}
          </div>
        )}
      </div>
    )
  }
)
FieldControl.displayName = "FieldControl"

// Field Help Text Component
export interface FieldHelpProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FieldHelp = React.forwardRef<HTMLParagraphElement, FieldHelpProps>(
  ({ className, children, ...props }, ref) => {
    const { id, invalid } = useFieldContext()
    const state = invalid ? "invalid" : "default"
    
    return (
      <p
        ref={ref}
        id={`${id}-help`}
        className={cn(fieldHelpVariants({ state }), className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FieldHelp.displayName = "FieldHelp"

// Field Error Component
export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { id, invalid } = useFieldContext()
    
    if (!invalid || !children) return null
    
    return (
      <p
        ref={ref}
        id={`${id}-error`}
        role="alert"
        className={cn("text-xs text-destructive flex items-center gap-1", className)}
        {...props}
      >
        <AlertCircle className="icon-xs" />
        {children}
      </p>
    )
  }
)
FieldError.displayName = "FieldError"

// Field State Indicator Component
export interface FieldStateProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: "valid" | "invalid" | "loading"
}

const FieldState = React.forwardRef<HTMLDivElement, FieldStateProps>(
  ({ className, state, ...props }, ref) => {
    if (!state) return null

    const icon = {
      valid: <Check className="icon-xs text-success" />,
      invalid: <AlertCircle className="icon-xs text-destructive" />,
      loading: <div className="icon-xs animate-spin border-2 border-muted-foreground border-t-transparent rounded-full" />,
    }[state]

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        {icon}
      </div>
    )
  }
)
FieldState.displayName = "FieldState"

// Field Clear Button Component
export interface FieldClearProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClear?: () => void
}

const FieldClear = React.forwardRef<HTMLButtonElement, FieldClearProps>(
  ({ className, onClear, ...props }, ref) => {
    const { disabled } = useFieldContext()

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClear}
        className={cn(
          "p-1 rounded-sm hover:bg-muted text-muted-foreground hover:text-foreground focus-ring transition-neo",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <X className="icon-xs" />
        <span className="sr-only">Clear field</span>
      </button>
    )
  }
)
FieldClear.displayName = "FieldClear"

// Field Counter Component
export interface FieldCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  current: number
  max?: number
}

const FieldCounter = React.forwardRef<HTMLSpanElement, FieldCounterProps>(
  ({ className, current, max, ...props }, ref) => {
    const isOverLimit = max !== undefined && current > max
    
    return (
      <span
        ref={ref}
        className={cn(
          "text-xs tabular-nums",
          isOverLimit ? "text-destructive" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {current}{max !== undefined && `/${max}`}
      </span>
    )
  }
)
FieldCounter.displayName = "FieldCounter"

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldHelp,
  FieldError,
  FieldState,
  FieldClear,
  FieldCounter,
  useFieldContext,
}
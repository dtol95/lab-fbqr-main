"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const formPageVariants = cva(
  "space-y-6"
)

const formHeaderVariants = cva(
  "space-y-4"
)

const formContentVariants = cva(
  "",
  {
    variants: {
      layout: {
        default: "space-y-6",
        grid: "grid gap-6 md:grid-cols-2",
        steps: "space-y-8",
        sidebar: "grid gap-8 lg:grid-cols-3",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
)

const formSectionVariants = cva(
  "space-y-4",
  {
    variants: {
      variant: {
        default: "",
        card: "p-6 border-2 border-[var(--neo-text)] bg-[var(--neo-bg)] shadow-neo",
        flat: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const formActionsVariants = cva(
  "flex gap-3 pt-6 border-t-2 border-[var(--neo-text)]",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
      sticky: {
        true: "sticky bottom-0 bg-[var(--neo-bg)] p-6 border-t-4 border-[var(--neo-text)] shadow-neo-large",
        false: "",
      },
    },
    defaultVariants: {
      align: "right",
      sticky: false,
    },
  }
)

interface FormPageProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formPageVariants> {
  children: React.ReactNode
}

interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formHeaderVariants> {
  title: string
  description?: string
  badge?: React.ReactNode
  progress?: number
  step?: { current: number; total: number }
}

interface FormContentProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formContentVariants> {
  children: React.ReactNode
}

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formSectionVariants> {
  title?: string
  description?: string
  required?: boolean
  children: React.ReactNode
}

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formActionsVariants> {
  children: React.ReactNode
}

interface FormSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormPage = React.forwardRef<HTMLDivElement, FormPageProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formPageVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FormPage.displayName = "FormPage"

const FormHeader = React.forwardRef<HTMLDivElement, FormHeaderProps>(
  ({ className, title, description, badge, progress, step, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formHeaderVariants(), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold uppercase tracking-tight">{title}</h1>
          {badge}
        </div>
        {step && (
          <Badge variant="outline" className="text-xs">
            Step {step.current} of {step.total}
          </Badge>
        )}
      </div>
      {description && (
        <p className="text-[var(--neo-text)]/70">
          {description}
        </p>
      )}
      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      <Separator />
    </div>
  )
)
FormHeader.displayName = "FormHeader"

const FormContent = React.forwardRef<HTMLDivElement, FormContentProps>(
  ({ className, layout, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formContentVariants({ layout }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FormContent.displayName = "FormContent"

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, variant, title, description, required, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formSectionVariants({ variant }), className)}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1 mb-4">
          {title && (
            <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
              {title}
              {required && <span className="text-[var(--neo-destructive)]">*</span>}
            </h2>
          )}
          {description && (
            <p className="text-sm text-[var(--neo-text)]/70">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
)
FormSection.displayName = "FormSection"

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align, sticky, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formActionsVariants({ align, sticky }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FormActions.displayName = "FormActions"

const FormSidebar = React.forwardRef<HTMLDivElement, FormSidebarProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </div>
  )
)
FormSidebar.displayName = "FormSidebar"

// Specialized form components
const FormCard = React.forwardRef<HTMLDivElement, {
  className?: string
  title?: string
  description?: string
  children: React.ReactNode
}>(({ className, title, description, children, ...props }, ref) => (
  <Card ref={ref} className={className} {...props}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle className="uppercase">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    )}
    <CardContent>
      {children}
    </CardContent>
  </Card>
))
FormCard.displayName = "FormCard"

const FormStepIndicator = React.forwardRef<HTMLDivElement, {
  className?: string
  steps: Array<{ title: string; completed?: boolean; current?: boolean }>
}>(({ className, steps, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 overflow-x-auto pb-2", className)}
    {...props}
  >
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center border-2 text-xs font-bold",
              step.completed && "bg-[var(--neo-success)] border-[var(--neo-success)] text-[var(--neo-on-success)]",
              step.current && "bg-[var(--neo-accent)] border-[var(--neo-accent)] text-[var(--neo-on-accent)]",
              !step.completed && !step.current && "border-[var(--neo-text)] text-[var(--neo-text)]"
            )}
          >
            {step.completed ? "✓" : index + 1}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              step.current && "text-[var(--neo-accent)]",
              !step.current && "text-[var(--neo-text)]/70"
            )}
          >
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className="h-0.5 w-8 bg-[var(--neo-text)]/20" />
        )}
      </React.Fragment>
    ))}
  </div>
))
FormStepIndicator.displayName = "FormStepIndicator"

const FormErrorSummary = React.forwardRef<HTMLDivElement, {
  className?: string
  errors: string[]
  onErrorClick?: (error: string, index: number) => void
}>(({ className, errors, onErrorClick, ...props }, ref) => {
  if (errors.length === 0) return null

  return (
    <Alert ref={ref} variant="destructive" className={className} {...props}>
      <AlertDescription>
        <p className="font-medium mb-2">Please fix the following errors:</p>
        <ul className="space-y-1">
          {errors.map((error, index) => (
            <li key={index}>
              <button
                type="button"
                className="text-left hover:underline focus-ring"
                onClick={() => onErrorClick?.(error, index)}
              >
                • {error}
              </button>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
})
FormErrorSummary.displayName = "FormErrorSummary"

const FormSuccessMessage = React.forwardRef<HTMLDivElement, {
  className?: string
  title?: string
  message: string
  actions?: React.ReactNode
}>(({ className, title = "Success!", message, actions, ...props }, ref) => (
  <Alert ref={ref} variant="success" className={className} {...props}>
    <AlertDescription>
      <div className="space-y-3">
        <div>
          <h3 className="font-bold uppercase text-sm">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
    </AlertDescription>
  </Alert>
))
FormSuccessMessage.displayName = "FormSuccessMessage"

const FormLoadingState = React.forwardRef<HTMLDivElement, {
  className?: string
  message?: string
}>(({ className, message = "Processing...", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center p-8 space-x-3", className)}
    {...props}
  >
    <div className="w-4 h-4 border-2 border-[var(--neo-text)]/20 border-t-[var(--neo-text)] rounded-full animate-spin" />
    <span className="text-sm font-medium text-[var(--neo-text)]/70">{message}</span>
  </div>
))
FormLoadingState.displayName = "FormLoadingState"

export {
  FormPage,
  FormHeader,
  FormContent,
  FormSection,
  FormActions,
  FormSidebar,
  FormCard,
  FormStepIndicator,
  FormErrorSummary,
  FormSuccessMessage,
  FormLoadingState,
}
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsPageVariants = cva(
  "space-y-8"
)

const settingsHeaderVariants = cva(
  "space-y-2"
)

const settingsSectionVariants = cva(
  "space-y-6",
  {
    variants: {
      layout: {
        default: "",
        grid: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        list: "space-y-4",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
)

const settingsItemVariants = cva(
  "space-y-4 p-6 border-2 border-[var(--neo-text)] bg-[var(--neo-bg)] shadow-neo",
  {
    variants: {
      variant: {
        default: "",
        card: "rounded-none",
        flat: "border-0 shadow-none bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SettingsPageProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof settingsPageVariants> {
  children: React.ReactNode
}

interface SettingsHeaderProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof settingsHeaderVariants> {
  title: string
  description?: string
  badge?: React.ReactNode
  actions?: React.ReactNode
}

interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof settingsSectionVariants> {
  title?: string
  description?: string
  children: React.ReactNode
}

interface SettingsItemProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof settingsItemVariants> {
  title: string
  description?: string
  badge?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}

interface SettingsFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

interface SettingsGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
}

const SettingsPage = React.forwardRef<HTMLDivElement, SettingsPageProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(settingsPageVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
)
SettingsPage.displayName = "SettingsPage"

const SettingsHeader = React.forwardRef<HTMLDivElement, SettingsHeaderProps>(
  ({ className, title, description, badge, actions, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(settingsHeaderVariants(), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold uppercase tracking-tight">{title}</h1>
          {badge}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {description && (
        <p className="text-[var(--neo-text)]/70 text-lg">
          {description}
        </p>
      )}
      <Separator />
    </div>
  )
)
SettingsHeader.displayName = "SettingsHeader"

const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(
  ({ className, layout, title, description, children, ...props }, ref) => (
    <div ref={ref} className="space-y-4" {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-xl font-bold uppercase tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[var(--neo-text)]/70">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={cn(settingsSectionVariants({ layout }), className)}>
        {children}
      </div>
    </div>
  )
)
SettingsSection.displayName = "SettingsSection"

const SettingsItem = React.forwardRef<HTMLDivElement, SettingsItemProps>(
  ({ className, variant, title, description, badge, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(settingsItemVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold uppercase text-sm tracking-wide">
              {title}
            </h3>
            {badge}
          </div>
          {description && (
            <p className="text-sm text-[var(--neo-text)]/70">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {children && (
        <>
          <Separator />
          <div>{children}</div>
        </>
      )}
    </div>
  )
)
SettingsItem.displayName = "SettingsItem"

const SettingsField = React.forwardRef<HTMLDivElement, SettingsFieldProps>(
  ({ className, label, description, error, required, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="space-y-1">
        <label className="text-sm font-bold uppercase tracking-wide">
          {label}
          {required && <span className="text-[var(--neo-destructive)] ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-[var(--neo-text)]/70">
            {description}
          </p>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-[var(--neo-destructive)] font-medium">
          {error}
        </p>
      )}
    </div>
  )
)
SettingsField.displayName = "SettingsField"

const SettingsGroup = React.forwardRef<HTMLDivElement, SettingsGroupProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <Card ref={ref} className={className} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="uppercase">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  )
)
SettingsGroup.displayName = "SettingsGroup"

// Specialized settings components
const SettingsCardItem = React.forwardRef<HTMLDivElement, {
  className?: string
  title: string
  description?: string
  badge?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}>(({ className, title, description, badge, actions, children, ...props }, ref) => (
  <Card ref={ref} className={className} {...props}>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="uppercase text-sm">{title}</CardTitle>
          {badge}
        </div>
        {actions}
      </div>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
))
SettingsCardItem.displayName = "SettingsCardItem"

const SettingsTabsSection = React.forwardRef<HTMLDivElement, {
  className?: string
  defaultValue?: string
  children: React.ReactNode
}>(({ className, defaultValue, children, ...props }, ref) => (
  <Tabs ref={ref} defaultValue={defaultValue} className={className} {...props}>
    {children}
  </Tabs>
))
SettingsTabsSection.displayName = "SettingsTabsSection"

const SettingsDangerZone = React.forwardRef<HTMLDivElement, {
  className?: string
  title?: string
  children: React.ReactNode
}>(({ className, title = "Danger Zone", children, ...props }, ref) => (
  <Card ref={ref} className={cn("border-[var(--neo-destructive)]", className)} {...props}>
    <CardHeader>
      <CardTitle className="text-[var(--neo-destructive)] uppercase flex items-center gap-2">
        ⚠️ {title}
      </CardTitle>
      <CardDescription>
        These actions are irreversible. Please be careful.
      </CardDescription>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
))
SettingsDangerZone.displayName = "SettingsDangerZone"

export {
  SettingsPage,
  SettingsHeader,
  SettingsSection,
  SettingsItem,
  SettingsField,
  SettingsGroup,
  SettingsCardItem,
  SettingsTabsSection,
  SettingsDangerZone,
}
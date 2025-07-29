"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const appFrameVariants = cva(
  "min-h-screen bg-[var(--neo-bg)] text-[var(--neo-text)]",
  {
    variants: {
      layout: {
        default: "flex flex-col",
        sidebar: "flex",
        centered: "flex flex-col items-center",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
)

const appHeaderVariants = cva(
  "z-[var(--z-header)] border-b-4 border-[var(--neo-text)] bg-[var(--neo-bg)] px-6 py-4",
  {
    variants: {
      sticky: {
        true: "sticky top-0",
        false: "",
      },
    },
    defaultVariants: {
      sticky: true,
    },
  }
)

const appSidebarVariants = cva(
  "border-r-4 border-[var(--neo-text)] bg-[var(--neo-muted-bg)]",
  {
    variants: {
      width: {
        sm: "w-64",
        default: "w-72",
        lg: "w-80",
      },
      collapsible: {
        true: "transition-all duration-200",
        false: "",
      },
    },
    defaultVariants: {
      width: "default",
      collapsible: false,
    },
  }
)

const appMainVariants = cva(
  "flex-1",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
)

const appFooterVariants = cva(
  "border-t-4 border-[var(--neo-text)] bg-[var(--neo-muted-bg)] px-6 py-4 mt-auto"
)

interface AppFrameProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof appFrameVariants> {
  children: React.ReactNode
}

interface AppHeaderProps extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof appHeaderVariants> {
  children: React.ReactNode
}

interface AppSidebarProps extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof appSidebarVariants> {
  children: React.ReactNode
  collapsed?: boolean
}

interface AppMainProps extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof appMainVariants> {
  children: React.ReactNode
}

interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const AppFrame = React.forwardRef<HTMLDivElement, AppFrameProps>(
  ({ className, layout, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(appFrameVariants({ layout }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
AppFrame.displayName = "AppFrame"

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ className, sticky, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(appHeaderVariants({ sticky }), className)}
      {...props}
    >
      {children}
    </header>
  )
)
AppHeader.displayName = "AppHeader"

const AppSidebar = React.forwardRef<HTMLElement, AppSidebarProps>(
  ({ className, width, collapsible, collapsed, children, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        appSidebarVariants({ width, collapsible }),
        collapsed && collapsible && "w-16",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
)
AppSidebar.displayName = "AppSidebar"

const AppMain = React.forwardRef<HTMLElement, AppMainProps>(
  ({ className, padding, children, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(appMainVariants({ padding }), className)}
      {...props}
    >
      {children}
    </main>
  )
)
AppMain.displayName = "AppMain"

const AppFooter = React.forwardRef<HTMLElement, AppFooterProps>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(appFooterVariants(), className)}
      {...props}
    >
      {children}
    </footer>
  )
)
AppFooter.displayName = "AppFooter"

// Navigation components for header
const AppNavigation = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("flex items-center gap-6", className)}
      {...props}
    >
      {children}
    </nav>
  )
)
AppNavigation.displayName = "AppNavigation"

const AppBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 font-bold text-xl uppercase", className)}
      {...props}
    >
      {children}
    </div>
  )
)
AppBrand.displayName = "AppBrand"

const AppActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 ml-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
)
AppActions.displayName = "AppActions"

// Sidebar navigation components
const AppSidebarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("flex flex-col p-4", className)}
      {...props}
    >
      {children}
    </nav>
  )
)
AppSidebarNav.displayName = "AppSidebarNav"

const AppSidebarSection = React.forwardRef<HTMLDivElement, {
  className?: string
  title?: string
  children: React.ReactNode
}>(({ className, title, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6", className)}
    {...props}
  >
    {title && (
      <>
        <h3 className="mb-2 px-3 text-xs font-bold uppercase text-[var(--neo-text)]/60 tracking-wider">
          {title}
        </h3>
        <Separator className="mb-3" />
      </>
    )}
    <div className="space-y-1">
      {children}
    </div>
  </div>
))
AppSidebarSection.displayName = "AppSidebarSection"

const AppSidebarItem = React.forwardRef<HTMLButtonElement, {
  className?: string
  active?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}>(({ className, active, icon, children, onClick, ...props }, ref) => (
  <Button
    ref={ref}
    variant={active ? "accent" : "ghost"}
    className={cn(
      "w-full justify-start px-3 py-2 text-sm font-medium hover-accent",
      active && "bg-[var(--neo-accent)] text-[var(--neo-on-accent)]",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
    <span className="truncate">{children}</span>
  </Button>
))
AppSidebarItem.displayName = "AppSidebarItem"

export {
  AppFrame,
  AppHeader,
  AppSidebar,
  AppMain,
  AppFooter,
  AppNavigation,
  AppBrand,
  AppActions,
  AppSidebarNav,
  AppSidebarSection,
  AppSidebarItem,
}
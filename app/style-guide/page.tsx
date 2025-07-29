"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, Copy, Check, Mail, Phone, MessageSquare, 
  Link as LinkIcon, Type, Wifi, Heart, Star, Home, User,
  ChevronDown, Settings, Search, Plus, X, Eye, EyeOff,
  Calendar, Clock, Download, Upload, Edit, Trash2, Save
} from "lucide-react"

// Core UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { BrutalistSlider } from "@/components/ui/brutalist-slider"
import { ColorInput } from "@/components/ui/color-input"

// Layout Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Form Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

// Data Display
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

// Feedback Components  
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toast } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Interactive Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalTrigger } from "@/components/ui/modal"
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverBody, PopoverFooter } from "@/components/ui/popover"
import { BrutalistTooltip, BrutalistTooltipContent, BrutalistTooltipProvider, BrutalistTooltipTrigger, SimpleTooltip } from "@/components/ui/brutalist-tooltip"
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableHead, DataTableCell, SortableHeader, SelectableHeader, DataTableEmptyState, DataTableLoadingState } from "@/components/ui/data-table"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Navigation Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"

// Toggle Components
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FormSection, FormGroup, FormField, FormControls } from "@/components/ui/form-layout"
import { CloseButton } from "@/components/ui/close-button"
import { useToast } from "@/hooks/use-toast"
import { extractJSXCode } from "@/lib/code-extractor"
import { Toolbar, ToolbarItem } from "@/components/ui/toolbar"

// Template Components
import { 
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
  AppSidebarItem 
} from "@/components/templates/app-frame"
import { 
  SettingsPage,
  SettingsHeader,
  SettingsSection,
  SettingsItem,
  SettingsField,
  SettingsGroup,
  SettingsCardItem,
  SettingsDangerZone 
} from "@/components/templates/settings-page"
import { 
  FormPage,
  FormHeader,
  FormContent,
  FormSection as FormPageSection,
  FormActions,
  FormCard,
  FormStepIndicator,
  FormErrorSummary,
  FormSuccessMessage 
} from "@/components/templates/form-page"

// Documentation Components
import {
  ComponentAPI,
  AccessibilityNote,
  BestPractices,
  ComponentStates,
  VariantMatrix,
  UsageExamples
} from "@/components/style-guide/documentation-components"


// Navigation component for design system sections
const DesignSystemNavigation = ({ activeSection, onSectionChange }: {
  activeSection: string
  onSectionChange: (section: string) => void
}) => {
  const sections = [
    { id: "foundations", label: "Foundations", description: "Design tokens & rules" },
    { id: "icons", label: "Icons", description: "Icon system & usage" },
    { id: "atoms", label: "Atoms", description: "Basic building blocks" },
    { id: "molecules", label: "Molecules", description: "Simple combinations" },
    { id: "organisms", label: "Organisms", description: "Complex components" },
    { id: "templates", label: "Templates", description: "Page layouts" },
    { id: "guidelines", label: "Guidelines", description: "Accessibility & standards" }
  ]

  return (
    <div className="border-2 border-neo-text mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-0">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              p-4 text-left border-r-2 border-neo-text last:border-r-0 transition-all
              ${activeSection === section.id 
                ? 'bg-neo-accent text-neo-text' 
                : 'bg-neo-bg hover:bg-neo-interactive-bg text-neo-text'
              }
            `}
          >
            <div className="font-heading text-lg font-bold uppercase">{section.label}</div>
            <div className="text-sm font-mono">{section.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Code display component
const CodeBlock = ({ code, language = "tsx" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="relative bg-neo-text text-neo-bg p-4 font-mono text-sm overflow-x-auto">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 hover:bg-neo-bg/20 rounded transition-colors duration-150"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <pre className="whitespace-pre-wrap pr-12">{code}</pre>
      </div>
    </div>
  )
}

// Section component wrapper
const AtomicSection = ({ 
  title, 
  description, 
  children 
}: { 
  title: string
  description: string
  children: React.ReactNode
}) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="font-heading text-4xl font-bold uppercase mb-2">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
)

// Component showcase
const ComponentShowcase = ({ 
  title, 
  description, 
  preview, 
  code,
  dynamicCode = false,
  className = ""
}: { 
  title: string
  description: string
  preview: React.ReactNode
  code?: string
  dynamicCode?: boolean
  className?: string
}) => {
  // Generate dynamic code if requested and no static code provided
  const displayCode = useMemo(() => {
    if (code) return code
    if (dynamicCode && React.isValidElement(preview)) {
      try {
        return extractJSXCode(preview)
      } catch (error) {
        return '// Unable to extract code automatically'
      }
    }
    return '// No code provided'
  }, [code, dynamicCode, preview])

  return (
    <Card className="mb-8 shadow-neo-large">
      <CardHeader className="border-b-2 border-neo-text">
        <CardTitle className="font-heading text-xl">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`p-8 bg-white border-b-2 border-neo-text overflow-hidden ${className}`}>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-full">
            {preview}
          </div>
        </div>
        <div className="p-6">
          <CodeBlock code={displayCode} />
        </div>
      </CardContent>
    </Card>
  )
}

// FOUNDATIONS SECTION COMPONENTS

// Motion & Easing showcase
const MotionSystemShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Motion & Easing System"
      description="Standardized timing and easing functions for consistent animations"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neo-accent border-2 border-neo-text mx-auto transition-transform duration-[var(--neo-duration-fast)] ease-[var(--neo-ease-standard)] hover:translate-x-2">
            </div>
            <p className="font-mono text-sm">Fast (0.1s)</p>
            <p className="text-xs text-muted-foreground">Quick feedback</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neo-accent border-2 border-neo-text mx-auto transition-transform duration-[var(--neo-duration-std)] ease-[var(--neo-ease-standard)] hover:translate-x-2">
            </div>
            <p className="font-mono text-sm">Standard (0.15s)</p>
            <p className="text-xs text-muted-foreground">Default transitions</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neo-accent border-2 border-neo-text mx-auto transition-transform duration-[var(--neo-duration-slow)] ease-[var(--neo-ease-emphasized)] hover:translate-x-2">
            </div>
            <p className="font-mono text-sm">Slow (0.3s)</p>
            <p className="text-xs text-muted-foreground">Emphasized motion</p>
          </div>
        </div>
      }
      code={`/* Motion & Easing Tokens */
--neo-duration-fast: 0.1s;    /* Quick feedback */
--neo-duration-std: 0.15s;    /* Default transitions */
--neo-duration-slow: 0.3s;    /* Emphasized motion */
--neo-ease-standard: ease-in-out;
--neo-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);

/* Usage */
.hover-transition {
  transition: transform var(--neo-duration-std) var(--neo-ease-standard);
}

.hover-transition:hover {
  transform: translateX(0.5rem);
}`}
    />

    <ComponentShowcase
      title="Focus & Outline System"
      description="Standardized focus indicators for accessibility"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-4">
            <h4 className="font-bold">Outline Focus</h4>
            <button className="focus-ring p-3 bg-neo-accent border-2 border-neo-text font-bold">
              Focus me (outline)
            </button>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Inset Focus</h4>
            <input 
              placeholder="Focus me (inset)"
              className="focus-ring-inset p-3 bg-neo-interactive-bg border-2 border-neo-text w-full"
            />
          </div>
        </div>
      }
      code={`/* Focus System Tokens */
--neo-focus-ring: var(--neo-text);
--neo-focus-width: 2px;
--neo-focus-offset: 2px;

/* Focus Utilities */
.focus-ring:focus-visible {
  outline: var(--neo-focus-width) solid var(--neo-focus-ring);
  outline-offset: var(--neo-focus-offset);
}

.focus-ring-inset:focus-visible {
  box-shadow: inset 0 0 0 var(--neo-focus-width) var(--neo-focus-ring);
}`}
    />
  </div>
)

// Z-Index & Elevation showcase
const ElevationSystemShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Z-Index Scale"
      description="Layering system for predictable stacking contexts"
      preview={
        <div className="relative h-48 w-full overflow-hidden border-2 border-neo-text bg-neo-interactive-bg">
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-neo-bg border-2 border-neo-text flex items-center justify-center text-xs font-bold" style={{ zIndex: 'var(--z-header)' }}>
            Header (100)
          </div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-neo-accent border-2 border-neo-text flex items-center justify-center text-xs font-bold" style={{ zIndex: 'var(--z-sidebar)' }}>
            Sidebar (200)
          </div>
          <div className="absolute bottom-12 left-12 w-24 h-24 bg-neo-destructive text-white border-2 border-neo-text flex items-center justify-center text-xs font-bold" style={{ zIndex: 'var(--z-overlay)' }}>
            Overlay (300)
          </div>
          <div className="absolute bottom-16 left-16 w-24 h-24 bg-neo-success text-white border-2 border-neo-text flex items-center justify-center text-xs font-bold" style={{ zIndex: 'var(--z-modal)' }}>
            Modal (400)
          </div>
        </div>
      }
      code={`/* Z-Index Scale */
--z-header: 100;      /* Site header, navigation */
--z-sidebar: 200;     /* Sidebar panels */
--z-overlay: 300;     /* Overlays, dropdowns */
--z-modal: 400;       /* Modal dialogs */
--z-toast: 500;       /* Toast notifications */
--z-tooltip: 600;     /* Tooltips (highest)`}
    />

    <ComponentShowcase
      title="Elevation Guidelines"
      description="When to use different shadow variants for visual hierarchy"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-none mx-auto flex items-center justify-center font-bold text-sm">
              FLAT
            </div>
            <p className="font-mono text-sm">None</p>
            <p className="text-xs text-muted-foreground">Inline content, text</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow mx-auto flex items-center justify-center font-bold text-sm">
              DEFAULT
            </div>
            <p className="font-mono text-sm">Standard</p>
            <p className="text-xs text-muted-foreground">Buttons, cards, inputs</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-large mx-auto flex items-center justify-center font-bold text-sm">
              LARGE
            </div>
            <p className="font-mono text-sm">Elevated</p>
            <p className="text-xs text-muted-foreground">Modals, sheets, panels</p>
          </div>
        </div>
      }
      code={`/* Elevation Guidelines */

/* No Shadow - Inline content */
.neo-shadow-none { box-shadow: none; }
// Use for: text, inline elements, flat surfaces

/* Default Shadow - Interactive elements */  
.neo-shadow { box-shadow: 4px 4px 0px var(--neo-border-color); }
// Use for: buttons, cards, inputs, interactive elements

/* Large Shadow - Elevated surfaces */
.neo-shadow-large { box-shadow: 8px 8px 0px var(--neo-border-color); }  
// Use for: modals, sheets, panels, prominent containers`}
    />
  </div>
)

// ATOMS SECTION COMPONENTS

// Typography showcase
const TypographyShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Typography Scale"
      description="Brutalist typography system with consistent hierarchy and spacing"
      preview={
        <div className="w-full space-y-4 text-center">
          <h1 className="font-heading text-6xl font-bold uppercase">Heading 1</h1>
          <h2 className="font-heading text-4xl font-bold uppercase">Heading 2</h2>
          <h3 className="font-heading text-2xl font-bold uppercase">Heading 3</h3>
          <h4 className="font-heading text-xl font-bold uppercase">Heading 4</h4>
          <p className="text-lg font-normal">Large body text for introductions and important content</p>
          <p className="text-base font-normal">Regular body text for standard content</p>
          <p className="text-sm font-normal">Small text for captions and metadata</p>
          <p className="font-mono text-sm font-bold uppercase">Monospace text for code and data</p>
        </div>
      }
      code={`// Typography Examples
<h1 className="font-heading text-6xl font-bold uppercase">Heading 1</h1>
<h2 className="font-heading text-4xl font-bold uppercase">Heading 2</h2>
<p className="text-lg font-normal">Large body text</p>
<p className="text-base font-normal">Regular body text</p>
<p className="font-mono text-sm font-bold uppercase">Monospace text</p>`}
    />

    <ComponentShowcase
      title="Font Weights & Styles"
      description="Font weight variations and text styling utilities"
      preview={
        <div className="w-full space-y-2 text-center">
          <p className="text-xl font-normal">Font Weight Normal (500)</p>
          <p className="text-xl font-bold">Font Weight Bold (700)</p>
          <p className="text-xl font-heading">Font Weight Heading (900)</p>
          <p className="text-xl uppercase">Uppercase Transform</p>
          <p className="text-xl tracking-tight">Tight Letter Spacing</p>
        </div>
      }
      code={`// Font Weight Classes
.font-normal { font-weight: 500; }
.font-bold { font-weight: 700; }
.font-heading { font-weight: 900; }

// Text Transforms
.uppercase { text-transform: uppercase; }
.tracking-tight { letter-spacing: -0.02em; }`}
    />
  </div>
)

// Color system showcase
const ColorSystemShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Color Palette"
      description="Brutalist color system with semantic naming and consistent usage"
      preview={
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-[var(--page-bg)] border-2 border-neo-text mx-auto"></div>
            <p className="font-mono text-xs">page-bg</p>
            <p className="text-xs">#cccccc</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-[var(--neo-bg)] border-2 border-neo-text mx-auto"></div>
            <p className="font-mono text-xs">neo-bg</p>
            <p className="text-xs">#e0e0e0</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-[var(--neo-accent)] border-2 border-neo-text mx-auto"></div>
            <p className="font-mono text-xs">neo-accent</p>
            <p className="text-xs">#e3ff32</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-[var(--neo-text)] border-2 border-neo-text mx-auto"></div>
            <p className="font-mono text-xs">neo-text</p>
            <p className="text-xs">#1c1c1c</p>
          </div>
        </div>
      }
      code={`/* Brutalist Color Variables */
--page-bg: #cccccc;
--neo-bg: #e0e0e0;
--neo-interactive-bg: #f0f0f0;
--neo-text: #1c1c1c;
--neo-accent: #e3ff32;
--neo-border-color: #1c1c1c;`}
    />

    <ComponentShowcase
      title="Shadow System"
      description="Brutalist shadow variants for depth and interaction states"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow mx-auto flex items-center justify-center font-bold">
              DEFAULT
            </div>
            <p className="font-mono text-sm">neo-shadow</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-large mx-auto flex items-center justify-center font-bold">
              LARGE
            </div>
            <p className="font-mono text-sm">neo-shadow-large</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-none mx-auto flex items-center justify-center font-bold">
              NONE
            </div>
            <p className="font-mono text-sm">neo-shadow-none</p>
          </div>
        </div>
      }
      code={`/* Shadow System */
.neo-shadow { box-shadow: 4px 4px 0px var(--neo-border-color); }
.neo-shadow-large { box-shadow: 8px 8px 0px var(--neo-border-color); }
.neo-shadow-none { box-shadow: none; }`}
    />
  </div>
)

// Icons showcase
const IconsShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Icon Sizing Scale"
      description="Standardized icon sizing utilities for consistent usage"
      preview={
        <div className="grid grid-cols-4 gap-6 w-full">
          <div className="text-center space-y-2">
            <Home className="icon-xs mx-auto" />
            <p className="text-xs font-mono">icon-xs</p>
            <p className="text-xs text-muted-foreground">16px</p>
          </div>
          <div className="text-center space-y-2">
            <User className="icon-sm mx-auto" />
            <p className="text-xs font-mono">icon-sm</p>
            <p className="text-xs text-muted-foreground">20px</p>
          </div>
          <div className="text-center space-y-2">
            <Settings className="icon-md mx-auto" />
            <p className="text-xs font-mono">icon-md</p>
            <p className="text-xs text-muted-foreground">24px</p>
          </div>
          <div className="text-center space-y-2">
            <Search className="icon-lg mx-auto" />
            <p className="text-xs font-mono">icon-lg</p>
            <p className="text-xs text-muted-foreground">32px</p>
          </div>
        </div>
      }
      code={`/* Icon Sizing Utilities */
.icon-xs { width: 1rem; height: 1rem; }     /* 16px */
.icon-sm { width: 1.25rem; height: 1.25rem; } /* 20px */
.icon-md { width: 1.5rem; height: 1.5rem; }   /* 24px */
.icon-lg { width: 2rem; height: 2rem; }       /* 32px */

// Usage - Replace w-4/w-6/w-8 with semantic sizes
<Home className="icon-md" />
<User className="icon-sm" /> 
<Settings className="icon-lg" />`}
    />

    <ComponentShowcase
      title="Icon System Usage"
      description="Lucide icon library with consistent sizing and usage patterns"
      preview={
        <div className="grid grid-cols-8 gap-4 w-full">
          <div className="text-center space-y-2">
            <Home className="icon-md mx-auto" />
            <p className="text-xs font-mono">Home</p>
          </div>
          <div className="text-center space-y-2">
            <User className="icon-md mx-auto" />
            <p className="text-xs font-mono">User</p>
          </div>
          <div className="text-center space-y-2">
            <Settings className="icon-md mx-auto" />
            <p className="text-xs font-mono">Settings</p>
          </div>
          <div className="text-center space-y-2">
            <Search className="icon-md mx-auto" />
            <p className="text-xs font-mono">Search</p>
          </div>
          <div className="text-center space-y-2">
            <Mail className="icon-md mx-auto" />
            <p className="text-xs font-mono">Mail</p>
          </div>
          <div className="text-center space-y-2">
            <Phone className="icon-md mx-auto" />
            <p className="text-xs font-mono">Phone</p>
          </div>
          <div className="text-center space-y-2">
            <Calendar className="icon-md mx-auto" />
            <p className="text-xs font-mono">Calendar</p>
          </div>
          <div className="text-center space-y-2">
            <Clock className="icon-md mx-auto" />
            <p className="text-xs font-mono">Clock</p>
          </div>
        </div>
      }
      code={`import { Home, User, Settings, Search, Mail, Phone } from "lucide-react"

// Consistent icon usage with size utilities
<Home className="icon-md" />
<User className="icon-sm" />
<Settings className="icon-lg" />`}
    />

    <ComponentShowcase
      title="Content Type Icons"
      description="Specialized icons for QR code content types"
      preview={
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <LinkIcon className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">URL</p>
          </div>
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <Type className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Text</p>
          </div>
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <Mail className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Email</p>
          </div>
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <Phone className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Phone</p>
          </div>
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <MessageSquare className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">SMS</p>
          </div>
          <div className="text-center space-y-2 p-3 border-2 border-neo-text bg-neo-bg">
            <Wifi className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Wi-Fi</p>
          </div>
        </div>
      }
      code={`export const contentTypes = [
  { id: "url", label: "URL", icon: Link },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
]`}
    />
  </div>
)

// Spacing system showcase
const SpacingSystemShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Brutalist Spacing Scale"
      description="Standardized spacing system for consistent form and component layout"
      preview={
        <div className="w-full space-neo-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-neo-md w-full">
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-xs (8px)</div>
              <div className="bg-neo-accent h-2"></div>
            </div>
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-sm (12px)</div>
              <div className="bg-neo-accent h-3"></div>
            </div>
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-md (16px)</div>
              <div className="bg-neo-accent h-4"></div>
            </div>
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-lg (24px)</div>
              <div className="bg-neo-accent h-6"></div>
            </div>
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-xl (32px)</div>
              <div className="bg-neo-accent h-8"></div>
            </div>
            <div className="space-neo-sm">
              <div className="text-xs font-mono mb-2">space-neo-2xl (48px)</div>
              <div className="bg-neo-accent h-12"></div>
            </div>
          </div>
        </div>
      }
      code={`/* Brutalist Spacing System */
--neo-space-xs: 0.5rem;    /* 8px - tight spacing within components */
--neo-space-sm: 0.75rem;   /* 12px - form element internal spacing */
--neo-space-md: 1rem;      /* 16px - standard form field spacing */
--neo-space-lg: 1.5rem;    /* 24px - section spacing */
--neo-space-xl: 2rem;      /* 32px - major section breaks */
--neo-space-2xl: 3rem;     /* 48px - page section spacing */

/* Usage Classes */
.space-neo-md > * + * { margin-top: var(--neo-space-md); }
.gap-neo-md { gap: var(--neo-space-md); }
.neo-form-field { margin-bottom: var(--neo-space-md); }

/* Applied in Config Panel */
.config-section-header { padding: var(--neo-space-xl); }
.accordion-content { padding: var(--neo-space-lg); }`}
    />

    <ComponentShowcase
      title="Form Spacing Hierarchy"
      description="Applied spacing system for consistent form layout and element relationships"
      preview={
        <div className="w-full border-2 border-neo-text bg-neo-bg p-6">
          <div className="space-neo-lg">
            <h3 className="font-heading text-lg mb-4">Contact Form</h3>
            <div className="space-neo-md">
              <div className="space-neo-sm">
                <Label htmlFor="demo-name">Full Name</Label>
                <Input id="demo-name" placeholder="Enter your name" />
              </div>
              <div className="space-neo-sm">
                <Label htmlFor="demo-email">Email Address</Label>
                <Input id="demo-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-neo-sm">
                <Label htmlFor="demo-message">Message</Label>
                <Textarea id="demo-message" placeholder="Your message" rows={3} />
              </div>
            </div>
            <div className="flex gap-neo-sm">
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      }
      code={`<!-- Form with Brutalist Spacing -->
<form className="space-neo-lg">
  <div className="space-neo-md">
    <div className="space-neo-sm">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
    <div className="space-neo-sm">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  </div>
  <div className="flex gap-neo-sm">
    <Button>Submit</Button>
    <Button variant="outline">Cancel</Button>
  </div>
</form>`}
    />

    <ComponentShowcase
      title="Form Layout Components"
      description="Reusable layout components with built-in brutalist spacing patterns"
      preview={
        <div className="w-full border-2 border-neo-text bg-neo-bg p-6">
          <FormSection 
            title="User Profile" 
            description="Update your personal information"
          >
            <FormGroup columns={2}>
              <FormField>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </FormField>
              <FormField>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </FormField>
            </FormGroup>
            
            <FormGroup>
              <FormField>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" rows={3} />
              </FormField>
            </FormGroup>
            
            <FormControls>
              <Button>Save Changes</Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete Profile</Button>
            </FormControls>
          </FormSection>
        </div>
      }
      code={`// Using Form Layout Components
import { FormSection, FormGroup, FormField, FormControls } from "@/components/ui/form-layout"

<FormSection 
  title="User Profile" 
  description="Update your personal information"
>
  <FormGroup columns={2}>
    <FormField>
      <Label htmlFor="first-name">First Name</Label>
      <Input id="first-name" placeholder="John" />
    </FormField>
    <FormField>
      <Label htmlFor="last-name">Last Name</Label>
      <Input id="last-name" placeholder="Doe" />
    </FormField>
  </FormGroup>
  
  <FormControls>
    <Button>Save Changes</Button>
    <Button variant="outline">Cancel</Button>
  </FormControls>
</FormSection>`}
    />

  </div>
)

// Notification system showcase
const NotificationShowcase = () => {
  const { toast } = useToast()

  const showDefaultToast = () => {
    toast({
      title: "Default Notification",
      description: "This is a standard notification message with default styling.",
    })
  }

  const showSuccessToast = () => {
    toast({
      variant: "success",
      title: "Success!",
      description: "Your action was completed successfully. Everything is working as expected.",
    })
  }

  const showErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Error Occurred",
      description: "Something went wrong. Please try again or contact support if the issue persists.",
    })
  }

  const showInfoToast = () => {
    toast({
      title: "Information",
      description: "Here's some important information you should know about.",
    })
  }

  const showActionToast = () => {
    toast({
      title: "Action Required",
      description: "Would you like to undo this action?",
      action: (
        <Button variant="outline" size="sm" className="ml-auto">
          Undo
        </Button>
      ),
    })
  }

  const showLongToast = () => {
    toast({
      title: "Detailed Information",
      description: "This is a longer notification message that demonstrates how the toast component handles more detailed content. It should wrap properly and maintain good readability even with multiple lines of text.",
    })
  }

  return (
    <div className="grid gap-8">
      <ComponentShowcase
        title="Interactive Toast Notifications"
        description="Click buttons to see live toast examples with different variants and styles"
        preview={
          <div className="grid grid-cols-2 md:grid-cols-3 gap-neo-md w-full">
            <Button onClick={showDefaultToast} variant="outline">
              Default Toast
            </Button>
            <Button onClick={showSuccessToast} variant="default">
              Success Toast
            </Button>
            <Button onClick={showErrorToast} variant="destructive">
              Error Toast
            </Button>
            <Button onClick={showInfoToast} variant="secondary">
              Info Toast
            </Button>
            <Button onClick={showActionToast} variant="outline">
              Toast with Action
            </Button>
            <Button onClick={showLongToast} variant="outline">
              Long Description
            </Button>
          </div>
        }
        code={`import { useToast } from "@/hooks/use-toast"

function MyComponent() {
  const { toast } = useToast()

  // Default toast
  const showDefault = () => {
    toast({
      title: "Default Notification",
      description: "Standard notification message.",
    })
  }

  // Success toast
  const showSuccess = () => {
    toast({
      variant: "success",
      title: "Success!",
      description: "Action completed successfully.",
    })
  }

  // Error toast
  const showError = () => {
    toast({
      variant: "destructive",
      title: "Error Occurred",
      description: "Something went wrong.",
    })
  }

  // Toast with action button
  const showAction = () => {
    toast({
      title: "Action Required",
      description: "Would you like to undo?",
      action: (
        <Button variant="outline" size="sm">
          Undo
        </Button>
      ),
    })
  }

  return (
    <div>
      <Button onClick={showDefault}>Show Toast</Button>
    </div>
  )
}`}
      />

      <ComponentShowcase
        title="Toast Variants"
        description="All available toast styling variants with brutalist design"
        preview={
          <div className="space-neo-md">
            <div className="p-4 border-2 border-neo-text bg-neo-bg shadow-neo">
              <div className="font-bold uppercase text-base mb-2">Default Toast</div>
              <div className="text-sm opacity-80">Standard notification with neutral styling</div>
            </div>
            <div className="p-4 border-2 border-neo-text bg-neo-accent shadow-neo">
              <div className="font-bold uppercase text-base mb-2">Success Toast</div>
              <div className="text-sm opacity-80">Positive feedback with accent background</div>
            </div>
            <div className="p-4 border-2 border-neo-text bg-[var(--neo-destructive)] shadow-neo">
              <div className="font-bold uppercase text-base mb-2 text-white">Error Toast</div>
              <div className="text-sm opacity-80 text-white">Error messages with red background</div>
            </div>
          </div>
        }
        code={`// Toast component variants
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden p-4 transition-all border-2 border-[var(--neo-text)] shadow-[4px_4px_0px_var(--neo-text)] rounded-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--neo-bg)]",
        success: "bg-[var(--neo-accent)]",
        destructive: "bg-[var(--neo-destructive)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)`}
      />
    </div>
  )
}

// Basic controls showcase
const BasicControlsShowcase = () => {
  const [sliderValue, setSliderValue] = useState([50])
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const [progressValue] = useState(65)

  return (
    <div className="grid gap-8">
      <ComponentShowcase
        title="Form Controls"
        description="Basic input controls with brutalist styling"
        preview={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Input Field</Label>
              <Input id="demo-input" placeholder="Enter text here" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Textarea</Label>
              <Textarea id="demo-textarea" placeholder="Enter longer text" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-color">Color Input</Label>
              <ColorInput value="#e3ff32" onChange={() => {}} />
            </div>
          </div>
        }
        code={`<Input placeholder="Enter text here" />
<Textarea placeholder="Enter longer text" rows={3} />
<ColorInput value="#e3ff32" onChange={setColor} />`}
      />

      <ComponentShowcase
        title="Interactive Controls"
        description="Toggles, sliders, and selection controls"
        preview={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <div className="space-y-4">
              <Label htmlFor="demo-checkbox">Checkbox Control</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="demo-checkbox"
                  checked={checkboxValue}
                  onCheckedChange={setCheckboxValue}
                />
                <Label htmlFor="demo-checkbox">Check me</Label>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="demo-switch">Switch Control</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="demo-switch"
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label htmlFor="demo-switch">Toggle me</Label>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="demo-slider">Slider Control</Label>
              <div className="space-y-2">
                <BrutalistSlider
                  id="demo-slider"
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
                <p className="text-sm font-mono">Value: {sliderValue[0]}</p>
              </div>
            </div>
          </div>
        }
        code={`<Checkbox checked={checked} onCheckedChange={setChecked} />
<Switch checked={enabled} onCheckedChange={setEnabled} />
<BrutalistSlider 
  value={[value]} 
  onValueChange={setValue}
  max={100} 
  step={1} 
/>`}
      />

      <ComponentShowcase
        title="Selection Controls"
        description="Radio groups, selects, and progress indicators"
        preview={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="space-y-4">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1" className="text-base">Option 1</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2" className="text-base">Option 2</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3" className="text-base">Option 3</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label>Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Progress Bar</Label>
              <div className="space-y-2">
                <Progress value={progressValue} className="w-full" />
                <p className="text-sm font-mono">{progressValue}% complete</p>
              </div>
            </div>
          </div>
        }
        code={`<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-3">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1" className="text-base">Option 1</Label>
  </div>
  <div className="flex items-center space-x-3">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2" className="text-base">Option 2</Label>
  </div>
  <div className="flex items-center space-x-3">
    <RadioGroupItem value="option3" id="r3" />
    <Label htmlFor="r3" className="text-base">Option 3</Label>
  </div>
</RadioGroup>

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

<Progress value={65} className="w-full" />`}
      />
    </div>
  )
}

// Buttons showcase
const ButtonsShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Button Variants"
      description="All button style variants with consistent interaction patterns"
      preview={
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
          <Button asChild>
            <Link href="#">As Link</Link>
          </Button>
        </div>
      }
      code={`<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button disabled>Disabled</Button>`}
    />

    <ComponentShowcase
      title="Button Sizes & Shadows"
      description="Size variations and shadow options for different use cases"
      preview={
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Star className="w-4 h-4" />
          </Button>
          <Button shadow="none">No Shadow</Button>
          <Button shadow="default">Default Shadow</Button>
          <Button shadow="large">Large Shadow</Button>
          <Button interaction="enhanced">Enhanced</Button>
        </div>
      }
      code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Star className="w-4 h-4" /></Button>

<Button shadow="none">No Shadow</Button>
<Button shadow="large">Large Shadow</Button>
<Button interaction="enhanced">Enhanced</Button>`}
    />

    <ComponentShowcase
      title="Close Button"
      description="Specialized button for dismissing dialogs, sheets, and other overlays"
      preview={
        <div className="flex gap-4 w-full items-center justify-center">
          <div className="text-center space-y-2">
            <CloseButton />
            <p className="text-xs text-muted-foreground">Default</p>
          </div>
          <div className="text-center space-y-2">
            <CloseButton className="p-2" />
            <p className="text-xs text-muted-foreground">More Padding</p>
          </div>
          <div className="text-center space-y-2">
            <CloseButton className="p-0.5" />
            <p className="text-xs text-muted-foreground">Less Padding</p>
          </div>
        </div>
      }
      code={`import { CloseButton } from "@/components/ui/close-button"

<CloseButton />
<CloseButton className="p-2" /> // More padding
<CloseButton className="p-0.5" /> // Less padding`}
    />

    <ComponentShowcase
      title="Button Group Hover Pattern"
      description="Standard hover behavior for grouped buttons with accent color"
      preview={
        <div className="space-y-4 w-full">
          <div className="flex gap-2">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex border-2 border-neo-text">
            <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="rounded-none border-0 shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      }
      code={`// Standard button group
<div className="flex gap-2">
  <Button>Primary Action</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="destructive">Delete</Button>
</div>

// Icon toolbar with hover accent
<div className="flex border-2 border-neo-text">
  <Button 
    variant="outline" 
    className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none"
  >
    <Save className="w-4 h-4" />
  </Button>
  <Button 
    variant="outline" 
    className="rounded-none border-0 shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none"
  >
    <Edit className="w-4 h-4" />
  </Button>
</div>`}
    />
  </div>
)

// Data display showcase
const DataDisplayShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Badges"
      description="Status indicators and labels with various styles"
      preview={
        <div className="flex flex-wrap gap-4 w-full items-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
          <div className="flex items-center gap-2">
            <Badge>
              <Star className="w-3 h-3 mr-1" />
              With Icon
            </Badge>
          </div>
        </div>
      }
      code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>
<Badge>
  <Star className="w-3 h-3 mr-1" />
  With Icon
</Badge>`}
    />

    <ComponentShowcase
      title="Avatars"
      description="User profile images with fallback options"
      preview={
        <div className="flex flex-wrap gap-4 w-full items-center">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">XY</AvatarFallback>
          </Avatar>
        </div>
      }
      code={`<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Avatar className="h-12 w-12">
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`}
    />

    <ComponentShowcase
      title="Skeleton Loading"
      description="Loading placeholders for content areas"
      preview={
        <div className="space-y-4 w-full max-w-md">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      }
      code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>

<Skeleton className="h-32 w-full" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-4/5" />`}
    />
  </div>
)

// MOLECULES SECTION COMPONENTS
const MoleculesShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Toolbar Component"
      description="Reusable toolbar organism replacing inline button group hover patterns"
      preview={
        <div className="space-y-6 w-full">
          <div>
            <h4 className="font-bold mb-3">Horizontal Toolbar</h4>
            <Toolbar>
              <ToolbarItem>
                <Save className="icon-sm" />
              </ToolbarItem>
              <ToolbarItem>
                <Edit className="icon-sm" />
              </ToolbarItem>
              <ToolbarItem>
                <Trash2 className="icon-sm" />
              </ToolbarItem>
            </Toolbar>
          </div>
          <div>
            <h4 className="font-bold mb-3">Elevated Toolbar</h4>
            <Toolbar variant="elevated" size="lg">
              <ToolbarItem size="lg">
                <Download className="icon-md" />
              </ToolbarItem>
              <ToolbarItem size="lg">
                <Upload className="icon-md" />
              </ToolbarItem>
              <ToolbarItem size="lg">
                <Settings className="icon-md" />
              </ToolbarItem>
            </Toolbar>
          </div>
        </div>
      }
      code={`import { Toolbar, ToolbarItem } from "@/components/ui/toolbar"

// Basic toolbar with icon buttons
<Toolbar>
  <ToolbarItem>
    <Save className="icon-sm" />
  </ToolbarItem>
  <ToolbarItem>
    <Edit className="icon-sm" />
  </ToolbarItem>
  <ToolbarItem>
    <Trash2 className="icon-sm" />
  </ToolbarItem>
</Toolbar>

// Elevated toolbar with larger icons
<Toolbar variant="elevated" size="lg">
  <ToolbarItem size="lg">
    <Download className="icon-md" />
  </ToolbarItem>
</Toolbar>

// Replaces inline styles like:
// hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none`}
    />

    <ComponentShowcase
      title="Button Groups"
      description="Buttons combined into functional groups and toolbars"
      preview={
        <div className="space-y-6 w-full">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Primary</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex border-2 border-neo-text">
            <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="rounded-none border-0 shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      }
      code={`// Button group
<div className="flex gap-2">
  <Button variant="default">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="destructive">Delete</Button>
</div>

// Icon toolbar
<div className="flex border-2 border-neo-text">
  <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
    <Save className="w-4 h-4" />
  </Button>
  <Button variant="outline" className="rounded-none border-0 border-r-2 border-neo-text shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
    <Edit className="w-4 h-4" />
  </Button>
  <Button variant="outline" className="rounded-none border-0 shadow-none hover:bg-[var(--neo-accent)]/50 hover:shadow-none hover:transform-none">
    <Trash2 className="w-4 h-4" />
  </Button>
</div>`}
    />

    <ComponentShowcase
      title="Form Fields"
      description="Input components combined with labels and validation"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="name-field">Full Name</Label>
            <Input id="name-field" placeholder="Enter your name" />
            <p className="text-xs text-muted-foreground">This field is required</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-field">Email Address</Label>
            <Input id="email-field" type="email" placeholder="you@example.com" />
            <p className="text-xs text-green-600">✓ Valid email format</p>
          </div>
        </div>
      }
      code={`<div className="space-y-2">
  <Label htmlFor="name">Full Name</Label>
  <Input id="name" placeholder="Enter your name" />
  <p className="text-xs text-muted-foreground">This field is required</p>
</div>`}
    />

    <ComponentShowcase
      title="Cards"
      description="Content containers with headers, content, and actions"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <p className="text-sm text-muted-foreground">A simple card with title and content</p>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card.</p>
            </CardContent>
          </Card>
          
          <Card className="neo-interactive cursor-pointer">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <p className="text-sm text-muted-foreground">Hover to see interaction</p>
            </CardHeader>
            <CardContent>
              <p>This card responds to hover states.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Card content with action buttons</p>
              <div className="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">Secondary</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <p className="text-sm text-muted-foreground">Description</p>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
    <div className="flex gap-2 mt-4">
      <Button size="sm">Action</Button>
      <Button size="sm" variant="outline">Cancel</Button>
    </div>
  </CardContent>
</Card>`}
    />

    <ComponentShowcase
      title="Alert Messages"
      description="Status messages and notifications with different variants"
      preview={
        <div className="space-y-4 w-full">
          <Alert>
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>
              This is a default alert message.
            </AlertDescription>
          </Alert>
          
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your action was completed successfully.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please review this information carefully.
            </AlertDescription>
          </Alert>

          <Alert variant="info">
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Here is some helpful information for you.
            </AlertDescription>
          </Alert>
        </div>
      }
      code={`<Alert>
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>
    This is a default alert message.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your action was completed successfully.
  </AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Please review this information carefully.
  </AlertDescription>
</Alert>

<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Here is some helpful information for you.
  </AlertDescription>
</Alert>`}
    />
  </div>
)

// TEMPLATES SECTION COMPONENTS
const TemplatesShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="AppFrame Template"
      description="Complete application layout template with header, sidebar, main content, and footer"
      preview={
        <div className="w-full max-w-4xl border-2 border-neo-text bg-neo-bg">
          <AppFrame layout="sidebar" className="h-64">
            <AppHeader>
              <AppBrand>Brand</AppBrand>
              <AppNavigation>
                <Button variant="ghost" size="sm">Dashboard</Button>
                <Button variant="ghost" size="sm">Settings</Button>
              </AppNavigation>
              <AppActions>
                <Button size="sm">Login</Button>
              </AppActions>
            </AppHeader>
            <div className="flex flex-1">
              <AppSidebar width="sm">
                <AppSidebarNav>
                  <AppSidebarSection title="Navigation">
                    <AppSidebarItem active icon={<Home className="icon-sm" />}>
                      Dashboard
                    </AppSidebarItem>
                    <AppSidebarItem icon={<Settings className="icon-sm" />}>
                      Settings
                    </AppSidebarItem>
                    <AppSidebarItem icon={<User className="icon-sm" />}>
                      Profile
                    </AppSidebarItem>
                  </AppSidebarSection>
                </AppSidebarNav>
              </AppSidebar>
              <AppMain>
                <div className="text-center py-8">
                  <h2 className="text-lg font-bold mb-2">Main Content</h2>
                  <p className="text-sm text-muted-foreground">Application content goes here</p>
                </div>
              </AppMain>
            </div>
          </AppFrame>
        </div>
      }
      code={`import { AppFrame, AppHeader, AppSidebar, AppMain } from "@/components/templates/app-frame"

<AppFrame layout="sidebar">
  <AppHeader>
    <AppBrand>My App</AppBrand>
    <AppNavigation>
      <Button variant="ghost">Dashboard</Button>
      <Button variant="ghost">Settings</Button>
    </AppNavigation>
    <AppActions>
      <Button>Login</Button>
    </AppActions>
  </AppHeader>
  <div className="flex flex-1">
    <AppSidebar>
      <AppSidebarNav>
        <AppSidebarSection title="Navigation">
          <AppSidebarItem active icon={<Home />}>
            Dashboard
          </AppSidebarItem>
          <AppSidebarItem icon={<Settings />}>
            Settings
          </AppSidebarItem>
        </AppSidebarSection>
      </AppSidebarNav>
    </AppSidebar>
    <AppMain>
      <h1>Welcome to the app</h1>
    </AppMain>
  </div>
</AppFrame>`}
    />

    <ComponentAPI 
      componentName="AppFrame"
      props={[
        { name: "layout", type: "\"default\" | \"sidebar\" | \"centered\"", default: "\"default\"", description: "Main layout configuration" },
        { name: "children", type: "React.ReactNode", required: true, description: "AppFrame content (header, main, footer, etc.)" },
        { name: "className", type: "string", description: "Additional CSS classes" }
      ]}
    />

    <ComponentShowcase
      title="SettingsPage Template"  
      description="Comprehensive settings page template with sections, items, and form fields"
      preview={
        <div className="w-full max-w-4xl border-2 border-neo-text bg-neo-bg p-4">
          <SettingsPage>
            <SettingsHeader 
              title="Account Settings"
              description="Manage your account preferences and security settings"
              badge={<Badge variant="info">Pro Account</Badge>}
              actions={
                <Button size="sm">Save All Changes</Button>
              }
            />
            <SettingsSection title="Profile Information" layout="default">
              <SettingsItem
                title="Personal Details"
                description="Update your name, email, and profile information"
                actions={<Button size="sm" variant="outline">Edit</Button>}
              >
                <div className="grid grid-cols-2 gap-4">
                  <SettingsField label="First Name" required>
                    <Input placeholder="John" />
                  </SettingsField>
                  <SettingsField label="Last Name" required>
                    <Input placeholder="Doe" />
                  </SettingsField>
                </div>
              </SettingsItem>
              
              <SettingsItem
                title="Email Preferences"
                description="Configure your notification settings"
                badge={<Badge variant="success">Active</Badge>}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Marketing emails</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Security alerts</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </SettingsItem>
            </SettingsSection>
            
            <SettingsDangerZone>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </SettingsDangerZone>
          </SettingsPage>
        </div>
      }
      code={`import { SettingsPage, SettingsHeader, SettingsSection, SettingsItem } from "@/components/templates/settings-page"

<SettingsPage>
  <SettingsHeader 
    title="Account Settings"
    description="Manage your account preferences"
    badge={<Badge variant="info">Pro Account</Badge>}
    actions={<Button>Save All</Button>}
  />
  <SettingsSection title="Profile Information">
    <SettingsItem
      title="Personal Details"
      description="Update your profile information"
      actions={<Button variant="outline">Edit</Button>}
    >
      <div className="grid grid-cols-2 gap-4">
        <SettingsField label="First Name" required>
          <Input placeholder="John" />
        </SettingsField>
        <SettingsField label="Last Name" required>
          <Input placeholder="Doe" />
        </SettingsField>
      </div>
    </SettingsItem>
  </SettingsSection>
  <SettingsDangerZone>
    <Button variant="destructive">Delete Account</Button>
  </SettingsDangerZone>
</SettingsPage>`}
    />

    <ComponentAPI 
      componentName="SettingsPage"
      props={[
        { name: "children", type: "React.ReactNode", required: true, description: "Settings page content" },
        { name: "className", type: "string", description: "Additional CSS classes" }
      ]}
    />

    <ComponentShowcase
      title="FormPage Template"
      description="Multi-step form template with progress tracking, validation, and error handling"
      preview={
        <div className="w-full max-w-4xl border-2 border-neo-text bg-neo-bg p-4">
          <FormPage>
            <FormHeader 
              title="Create New Project"
              description="Fill out the form below to create your new project"
              progress={60}
              step={{ current: 2, total: 3 }}
            />
            <FormContent layout="default">
              <FormPageSection 
                title="Project Details"
                description="Basic information about your project"
                required
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name *</Label>
                    <Input id="project-name" placeholder="My Awesome Project" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Application</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="desktop">Desktop Software</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your project..." rows={3} />
                </div>
              </FormPageSection>
              
              <FormSuccessMessage 
                title="Validation Passed"
                message="All required fields have been completed successfully."
                actions={<Button size="sm" variant="outline">Review</Button>}
              />
            </FormContent>
            <FormActions align="between">
              <Button variant="outline">Previous Step</Button>
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Next Step</Button>
              </div>
            </FormActions>
          </FormPage>
        </div>
      }
      code={`import { FormPage, FormHeader, FormContent, FormSection, FormActions } from "@/components/templates/form-page"

<FormPage>
  <FormHeader 
    title="Create New Project"
    description="Fill out the form below"
    progress={60}
    step={{ current: 2, total: 3 }}
  />
  <FormContent layout="default">
    <FormSection 
      title="Project Details"
      description="Basic project information"
      required
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input id="name" placeholder="My Project" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Project Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web App</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormSection>
    <FormSuccessMessage 
      message="All fields completed successfully."
    />
  </FormContent>
  <FormActions align="between">
    <Button variant="outline">Previous</Button>
    <Button>Next Step</Button>
  </FormActions>
</FormPage>`}
    />

    <ComponentAPI 
      componentName="FormPage"
      props={[
        { name: "children", type: "React.ReactNode", required: true, description: "Form page content" },
        { name: "className", type: "string", description: "Additional CSS classes" }
      ]}
    />

    <AccessibilityNote
      ariaLabels={[
        "All form elements must have proper labels",
        "Progress indicators use aria-valuenow and aria-valuemax", 
        "Step indicators use aria-current for current step",
        "Error messages are associated with fields via aria-describedby"
      ]}
      keyboardControls={[
        { key: "Tab", action: "Navigate between form elements" },
        { key: "Enter", action: "Submit form or proceed to next step" },
        { key: "Escape", action: "Cancel form or close validation errors" }
      ]}
      focusManagement={[
        "Focus moves to first error field when validation fails",
        "Focus returns to trigger element when modal forms close",
        "Focus moves to next step when advancing through multi-step forms"
      ]}
      screenReader={[
        "Progress and step information announced when changed",
        "Validation errors announced immediately",
        "Success messages announced when forms complete"
      ]}
    />

    <BestPractices
      dos={[
        "Use semantic HTML form elements",
        "Provide clear progress indicators for multi-step forms",
        "Show validation feedback immediately after field interaction",
        "Use consistent button placement and action hierarchy",
        "Provide success confirmation for completed actions"
      ]}
      donts={[
        "Don't submit forms without user confirmation",
        "Don't hide critical validation errors",
        "Don't use unclear or generic error messages",
        "Don't remove progress indicators in long forms",
        "Don't disable submit buttons without clear reason"
      ]}
      tips={[
        "Use FormPage template for complex multi-step workflows",
        "SettingsPage template works well for configuration interfaces", 
        "AppFrame template provides consistent navigation structure",
        "Combine templates for complex application layouts",
        "Templates are responsive and work well on mobile devices"
      ]}
    />
  </div>
)

// ORGANISMS SECTION COMPONENTS
const OrganismsShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Modal System"
      description="Enhanced modal dialogs with various sizes, variants, and accessibility features"
      preview={
        <div className="flex gap-4 w-full justify-center">
          <Modal>
            <ModalTrigger asChild>
              <Button>Standard Modal</Button>
            </ModalTrigger>
            <ModalContent size="default">
              <ModalHeader>
                <ModalTitle>Confirm Action</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Large Modal</Button>
            </ModalTrigger>
            <ModalContent size="lg" variant="blur">
              <ModalHeader>
                <ModalTitle>Large Modal Example</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>This is a larger modal with blur backdrop variant. It demonstrates the modal system's flexibility.</p>
                <div className="mt-4 p-4 border-2 border-neo-text bg-neo-interactive-bg">
                  <p className="text-sm">Content area with brutalist styling</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button>Got it</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      }
      code={`import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/modal"

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent size="default">
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <p>Modal content goes here</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}
    />

    <ComponentAPI 
      componentName="Modal"
      props={[
        { name: "size", type: "\"sm\" | \"default\" | \"lg\" | \"xl\" | \"full\"", default: "\"default\"", description: "Modal size variant" },
        { name: "variant", type: "\"default\" | \"blur\" | \"solid\"", default: "\"default\"", description: "Backdrop variant" },
        { name: "padding", type: "\"none\" | \"sm\" | \"default\" | \"lg\"", default: "\"default\"", description: "Content padding" },
        { name: "children", type: "React.ReactNode", required: true, description: "Modal content" }
      ]}
    />

    <ComponentShowcase
      title="BrutalistTooltip System"
      description="Enhanced tooltip system with multiple variants and semantic colors"
      preview={
        <div className="flex flex-wrap gap-4 w-full justify-center items-center">
          <BrutalistTooltipProvider>
            <SimpleTooltip content="Default tooltip">
              <Button variant="outline">Default</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>

          <BrutalistTooltipProvider>
            <SimpleTooltip content="Success action completed" variant="success">
              <Button variant="outline">Success</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>

          <BrutalistTooltipProvider>
            <SimpleTooltip content="Warning: Please review" variant="warning">
              <Button variant="outline">Warning</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>

          <BrutalistTooltipProvider>
            <SimpleTooltip content="Error occurred" variant="destructive">
              <Button variant="outline">Error</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>

          <BrutalistTooltipProvider>
            <SimpleTooltip content="Information available" variant="info">
              <Button variant="outline">Info</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>

          <BrutalistTooltipProvider>
            <SimpleTooltip content="Large tooltip content" size="lg" variant="accent">
              <Button variant="outline">Large Accent</Button>
            </SimpleTooltip>
          </BrutalistTooltipProvider>
        </div>
      }
      code={`import { SimpleTooltip, BrutalistTooltipProvider } from "@/components/ui/brutalist-tooltip"

<BrutalistTooltipProvider>
  <SimpleTooltip content="Default tooltip">
    <Button>Hover me</Button>
  </SimpleTooltip>
</BrutalistTooltipProvider>

<BrutalistTooltipProvider>
  <SimpleTooltip content="Success message" variant="success">
    <Button>Success</Button>
  </SimpleTooltip>
</BrutalistTooltipProvider>

<BrutalistTooltipProvider>
  <SimpleTooltip content="Large tooltip" size="lg" variant="accent">
    <Button>Large Accent</Button>
  </SimpleTooltip>
</BrutalistTooltipProvider>`}
    />

    <ComponentAPI 
      componentName="BrutalistTooltip"
      props={[
        { name: "variant", type: "\"default\" | \"accent\" | \"destructive\" | \"success\" | \"warning\" | \"info\"", default: "\"default\"", description: "Tooltip color variant" },
        { name: "size", type: "\"sm\" | \"default\" | \"lg\"", default: "\"default\"", description: "Tooltip size" },
        { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"top\"", description: "Tooltip position" },
        { name: "content", type: "React.ReactNode", required: true, description: "Tooltip content" }
      ]}
    />

    <ComponentShowcase
      title="Enhanced DataTable"
      description="Complete data table with sorting, selection, density modes, and state management"
      preview={
        <div className="w-full">
          <DataTable variant="striped" density="comfortable">
            <DataTableHeader>
              <DataTableRow>
                <SelectableHeader />
                <SortableHeader sortKey="name">Name</SortableHeader>
                <SortableHeader sortKey="email">Email</SortableHeader>
                <DataTableHead>Role</DataTableHead>
                <DataTableHead>Actions</DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              <DataTableRow selectable>
                <DataTableCell>
                  <Checkbox />
                </DataTableCell>
                <DataTableCell className="font-medium">John Doe</DataTableCell>
                <DataTableCell>john@example.com</DataTableCell>
                <DataTableCell><Badge>Admin</Badge></DataTableCell>
                <DataTableCell>
                  <Button size="sm" variant="outline">Edit</Button>
                </DataTableCell>
              </DataTableRow>
              <DataTableRow selectable>
                <DataTableCell>
                  <Checkbox />
                </DataTableCell>
                <DataTableCell className="font-medium">Jane Smith</DataTableCell>
                <DataTableCell>jane@example.com</DataTableCell>
                <DataTableCell><Badge variant="secondary">User</Badge></DataTableCell>
                <DataTableCell>
                  <Button size="sm" variant="outline">Edit</Button>
                </DataTableCell>
              </DataTableRow>
              <DataTableEmptyState colSpan={5}>
                <div className="text-center py-8">
                  <p className="text-sm font-medium">No more data</p>
                  <p className="text-xs text-muted-foreground">Add new items to see them here.</p>
                </div>
              </DataTableEmptyState>
            </DataTableBody>
          </DataTable>
        </div>
      }
      code={`import { DataTable, DataTableHeader, DataTableBody, DataTableRow, SortableHeader, SelectableHeader } from "@/components/ui/data-table"

<DataTable variant="striped" density="comfortable">
  <DataTableHeader>
    <DataTableRow>
      <SelectableHeader />
      <SortableHeader sortKey="name">Name</SortableHeader>
      <SortableHeader sortKey="email">Email</SortableHeader>
      <DataTableHead>Role</DataTableHead>
      <DataTableHead>Actions</DataTableHead>
    </DataTableRow>
  </DataTableHeader>
  <DataTableBody>
    <DataTableRow selectable>
      <DataTableCell><Checkbox /></DataTableCell>
      <DataTableCell>John Doe</DataTableCell>
      <DataTableCell>john@example.com</DataTableCell>
      <DataTableCell><Badge>Admin</Badge></DataTableCell>
      <DataTableCell>
        <Button size="sm" variant="outline">Edit</Button>
      </DataTableCell>
    </DataTableRow>
  </DataTableBody>
</DataTable>`}
    />

    <ComponentAPI 
      componentName="DataTable"
      props={[
        { name: "variant", type: "\"default\" | \"striped\" | \"bordered\"", default: "\"default\"", description: "Table styling variant" },
        { name: "density", type: "\"comfortable\" | \"compact\"", default: "\"comfortable\"", description: "Row spacing density" },
        { name: "children", type: "React.ReactNode", required: true, description: "Table content (header, body)" }
      ]}
    />

    <ComponentShowcase
      title="Enhanced Popover System"
      description="Enhanced popover with variants, sizing, and composition components"
      preview={
        <div className="flex gap-4 w-full justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Default Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Quick Settings</PopoverTitle>
              </PopoverHeader>
              <PopoverBody>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Notifications</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Dark Mode</Label>
                    <Switch />
                  </div>
                </div>
              </PopoverBody>
              <PopoverFooter>
                <Button size="sm">Save</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Accent Popover</Button>
            </PopoverTrigger>
            <PopoverContent variant="accent" size="lg">
              <PopoverHeader>
                <PopoverTitle>Feature Highlight</PopoverTitle>
              </PopoverHeader>
              <PopoverBody>
                <p>This popover uses the accent variant to draw attention to important information or features.</p>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      }
      code={`import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverBody } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button>Open Settings</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Quick Settings</PopoverTitle>
    </PopoverHeader>
    <PopoverBody>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Notifications</Label>
          <Switch />
        </div>
      </div>
    </PopoverBody>
    <PopoverFooter>
      <Button size="sm">Save</Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>`}
    />

    <ComponentAPI 
      componentName="Popover"
      props={[
        { name: "size", type: "\"sm\" | \"default\" | \"lg\" | \"xl\" | \"auto\"", default: "\"default\"", description: "Popover size" },
        { name: "variant", type: "\"default\" | \"accent\" | \"muted\"", default: "\"default\"", description: "Popover color variant" },
        { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"center\"", description: "Alignment relative to trigger" },
        { name: "sideOffset", type: "number", default: "4", description: "Distance from trigger element" }
      ]}
    />

    <ComponentShowcase
      title="Enhanced Tabs System"
      description="Comprehensive tabs with variants, orientation support, and badge integration"
      preview={
        <div className="space-y-6 w-full">
          <div>
            <h4 className="font-bold mb-3">Default Tabs</h4>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <div className="p-4 border-2 border-neo-text bg-neo-bg">
                  <h3 className="font-bold mb-2">Overview Content</h3>
                  <p>This is the overview tab content area with default styling.</p>
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <div className="p-4 border-2 border-neo-text bg-neo-bg">
                  <h3 className="font-bold mb-2">Analytics Content</h3>
                  <p>Analytics and metrics information displayed here.</p>
                </div>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <div className="p-4 border-2 border-neo-text bg-neo-bg">
                  <h3 className="font-bold mb-2">Settings Content</h3>
                  <p>Configuration and preference options.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h4 className="font-bold mb-3">Pills Variant</h4>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList variant="pills" className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1" variant="pills">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="tab2" variant="pills">
                  Reports
                </TabsTrigger>
                <TabsTrigger value="tab3" variant="pills">
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4" padding="lg">
                <p>Dashboard content with pills-style tab navigation.</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4" padding="lg">
                <p>Reports and analytics with enhanced spacing.</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4" padding="lg">
                <p>Admin panel configuration options.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      }
      code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Default tabs
<Tabs defaultValue="tab1">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Analytics</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Tab content goes here</p>
  </TabsContent>
</Tabs>

// Pills variant
<Tabs defaultValue="tab1">
  <TabsList variant="pills" className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1" variant="pills">Dashboard</TabsTrigger>
    <TabsTrigger value="tab2" variant="pills">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" padding="lg">
    <p>Enhanced content with padding</p>
  </TabsContent>
</Tabs>`}
    />

    <ComponentAPI 
      componentName="Tabs"
      props={[
        { name: "variant", type: "\"default\" | \"pills\" | \"underline\"", default: "\"default\"", description: "Tab styling variant" },
        { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Tab orientation" },
        { name: "size", type: "\"sm\" | \"default\" | \"lg\"", default: "\"default\"", description: "Tab size" },
        { name: "defaultValue", type: "string", description: "Initially selected tab" }
      ]}
    />

    <AccessibilityNote
      ariaLabels={[
        "All interactive elements have proper ARIA labels",
        "Tables use proper column headers and row relationships",
        "Modals trap focus and return focus on close",
        "Tooltips are associated with trigger elements via aria-describedby"
      ]}
      keyboardControls={[
        { key: "Tab", action: "Navigate between focusable elements" },
        { key: "Enter/Space", action: "Activate buttons and triggers" },
        { key: "Escape", action: "Close modals, popovers, and tooltips" },
        { key: "Arrow keys", action: "Navigate within tab lists and data tables" }
      ]}
      focusManagement={[
        "Focus is trapped within modal dialogs",
        "Focus returns to trigger element when closing overlays",
        "Tab navigation follows logical visual order",
        "Focus indicators are clearly visible"
      ]}
      screenReader={[
        "All content is accessible to screen readers",
        "State changes are announced appropriately",
        "Table data includes proper header associations",
        "Modal titles and descriptions are announced"
      ]}
    />

    <BestPractices
      dos={[
        "Use DataTable for complex data with sorting/filtering needs",
        "Use Modal for critical confirmations and complex forms",
        "Use BrutalistTooltip for helpful context and status information",
        "Use Popover for lightweight settings and quick actions",
        "Use Tabs to organize related content into logical sections"
      ]}
      donts={[
        "Don't use modals for simple confirmations (prefer inline alerts)",
        "Don't nest modals or tooltips within each other",
        "Don't use tables for simple lists (prefer cards or lists)",
        "Don't use too many tab levels (prefer hierarchical navigation)",
        "Don't use tooltips for critical information (prefer persistent UI)"
      ]}
      tips={[
        "Combine organisms for complex interfaces (tabs with data tables)",
        "Use consistent sizing across related components",
        "Test keyboard navigation thoroughly",
        "Consider mobile responsive behavior for all organisms",
        "Use semantic variants to convey meaning (success, warning, error)"
      ]}
    />
  </div>
)

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState("foundations")

  const renderSection = () => {
    switch (activeSection) {
      case "foundations":
        return (
          <AtomicSection 
            title="Foundations" 
            description="Design tokens, CSS variables, and fundamental rules that power the system"
          >
            <TypographyShowcase />
            <ColorSystemShowcase />
            <SpacingSystemShowcase />
            <MotionSystemShowcase />
            <ElevationSystemShowcase />
          </AtomicSection>
        )
      case "icons":
        return (
          <AtomicSection 
            title="Icons" 
            description="Icon system with standardized sizing and content-specific usage"
          >
            <IconsShowcase />
          </AtomicSection>
        )
      case "atoms":
        return (
          <AtomicSection 
            title="Atoms" 
            description="The basic building blocks of our design system"
          >
            <ButtonsShowcase />
            <BasicControlsShowcase />
            <NotificationShowcase />
            <DataDisplayShowcase />
          </AtomicSection>
        )
      case "molecules":
        return (
          <AtomicSection 
            title="Molecules" 
            description="Simple combinations of atoms working together"
          >
            <MoleculesShowcase />
          </AtomicSection>
        )
      case "organisms":
        return (
          <AtomicSection 
            title="Organisms" 
            description="Complex components made of molecules and atoms"
          >
            <OrganismsShowcase />
          </AtomicSection>
        )
      case "templates":
        return (
          <AtomicSection 
            title="Templates" 
            description="Page-level layouts and structure patterns"
          >
            <TemplatesShowcase />
          </AtomicSection>
        )
      case "guidelines":
        return (
          <AtomicSection 
            title="Guidelines" 
            description="Accessibility standards, component states, and design principles"
          >
            <ComponentShowcase
              title="Component States Matrix"
              description="Every component must document these states for consistency and accessibility"
              preview={
                <div className="w-full border-2 border-neo-text">
                  <div className="grid grid-cols-6 gap-0">
                    <div className="font-bold p-3 border-r border-b border-neo-text bg-neo-muted">Component</div>
                    <div className="font-bold p-3 border-r border-b border-neo-text bg-neo-muted text-center">Default</div>
                    <div className="font-bold p-3 border-r border-b border-neo-text bg-neo-muted text-center">Hover</div>
                    <div className="font-bold p-3 border-r border-b border-neo-text bg-neo-muted text-center">Active</div>
                    <div className="font-bold p-3 border-r border-b border-neo-text bg-neo-muted text-center">Focus</div>
                    <div className="font-bold p-3 border-b border-neo-text bg-neo-muted text-center">Disabled</div>
                    
                    <div className="p-3 border-r border-b border-neo-text font-mono text-sm">Button</div>
                    <div className="p-2 border-r border-b border-neo-text text-center"><Button size="sm">Default</Button></div>
                    <div className="p-2 border-r border-b border-neo-text text-center"><Button size="sm" className="hover:bg-neo-accent/90">Hover</Button></div>
                    <div className="p-2 border-r border-b border-neo-text text-center"><Button size="sm" className="active:shadow-none">Active</Button></div>
                    <div className="p-2 border-r border-b border-neo-text text-center"><Button size="sm" className="focus-ring">Focus</Button></div>
                    <div className="p-2 border-b border-neo-text text-center"><Button size="sm" disabled>Disabled</Button></div>
                  </div>
                </div>
              }
              code={`/* Every component must document these states: */

// Default - base appearance
// Hover - mouse hover interaction  
// Active - pressed/clicked state
// Focus - keyboard focus (must be visible)
// Disabled - non-interactive state

// Accessibility Requirements:
// - Focus indicators must be visible (not color-only)
// - Contrast ratios must meet WCAG standards
// - Interactive elements need proper ARIA labels
// - Keyboard navigation must work for all controls`}
            />

            <ComponentShowcase
              title="Density System"
              description="Comfortable and compact spacing modes for different contexts"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-4">
                    <h4 className="font-bold text-center">Comfortable (Default)</h4>
                    <div className="space-neo-lg border-2 border-neo-text p-4 bg-neo-bg">
                      <div className="space-neo-md">
                        <Label>Form Field</Label>
                        <Input placeholder="Comfortable spacing" />
                      </div>
                      <div className="space-neo-md">
                        <Label>Another Field</Label>
                        <Input placeholder="More breathing room" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-center">Compact</h4>
                    <div className="space-neo-sm border-2 border-neo-text p-3 bg-neo-bg">
                      <div className="space-neo-sm">
                        <Label className="text-sm">Form Field</Label>
                        <Input placeholder="Compact spacing" className="h-9" />
                      </div>
                      <div className="space-neo-sm">
                        <Label className="text-sm">Another Field</Label>
                        <Input placeholder="Tighter layout" className="h-9" />
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`/* Density Modes */

// Comfortable (Default) - use standard spacing tokens
.form-comfortable .space-neo-md > * + * { margin-top: var(--neo-space-md); }
.form-comfortable .gap-neo-md { gap: var(--neo-space-md); }

// Compact - use smaller spacing tokens  
.form-compact .space-neo-sm > * + * { margin-top: var(--neo-space-sm); }
.form-compact .gap-neo-sm { gap: var(--neo-space-sm); }

// Usage
<form className="form-comfortable"> // Standard density
<form className="form-compact">     // Compact density`}
            />
          </AtomicSection>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-page-bg min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-5xl md:text-6xl">Design System</h1>
        <Link
          href="/fbqr"
          className="inline-flex items-center gap-2 font-bold font-mono uppercase hover:underline text-sm"
        >
          <ArrowLeft size={16} />
          Back to App
        </Link>
      </header>

      <div className="max-w-7xl mx-auto">
        <DesignSystemNavigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="space-y-8">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
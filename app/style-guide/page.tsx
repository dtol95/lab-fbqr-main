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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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


// Navigation component for atomic design sections
const AtomicNavigation = ({ activeSection, onSectionChange }: {
  activeSection: string
  onSectionChange: (section: string) => void
}) => {
  const sections = [
    { id: "atoms", label: "Atoms", description: "Basic building blocks" },
    { id: "molecules", label: "Molecules", description: "Simple combinations" },
    { id: "organisms", label: "Organisms", description: "Complex components" },
    { id: "templates", label: "Templates", description: "Page layouts" }
  ]

  return (
    <div className="border-2 border-neo-text mb-8">
      <div className="grid grid-cols-4 gap-0">
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
      title="Icon System"
      description="Lucide icon library with consistent sizing and usage patterns"
      preview={
        <div className="grid grid-cols-8 gap-4 w-full">
          <div className="text-center space-y-2">
            <Home className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Home</p>
          </div>
          <div className="text-center space-y-2">
            <User className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">User</p>
          </div>
          <div className="text-center space-y-2">
            <Settings className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Settings</p>
          </div>
          <div className="text-center space-y-2">
            <Search className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Search</p>
          </div>
          <div className="text-center space-y-2">
            <Mail className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Mail</p>
          </div>
          <div className="text-center space-y-2">
            <Phone className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Phone</p>
          </div>
          <div className="text-center space-y-2">
            <Calendar className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Calendar</p>
          </div>
          <div className="text-center space-y-2">
            <Clock className="w-6 h-6 mx-auto" />
            <p className="text-xs font-mono">Clock</p>
          </div>
        </div>
      }
      code={`import { Home, User, Settings, Search, Mail, Phone } from "lucide-react"

// Icon usage
<Home className="w-6 h-6" />
<User className="w-4 h-4" /> // Small
<Settings className="w-8 h-8" /> // Large`}
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
            <div className="p-4 border-2 border-neo-text bg-[hsl(var(--neo-destructive-accent))] shadow-neo">
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
        destructive: "bg-[hsl(var(--neo-destructive-accent))]",
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

// ORGANISMS SECTION COMPONENTS
const OrganismsShowcase = () => (
  <div className="grid gap-8">
    <ComponentShowcase
      title="Navigation Bar"
      description="Complete navigation component with branding and actions"
      preview={
        <div className="w-full border-2 border-neo-text bg-neo-bg p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-bold">Brand</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Home</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
              <Button size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      }
      code={`<header className="border-2 border-neo-text bg-neo-bg p-4">
  <div className="flex items-center justify-between">
    <h1 className="font-heading text-2xl font-bold">Brand</h1>
    <nav className="flex items-center gap-4">
      <Button variant="ghost" size="sm">Home</Button>
      <Button variant="ghost" size="sm">About</Button>
      <Button size="sm">Sign In</Button>
    </nav>
  </div>
</header>`}
    />

    <ComponentShowcase
      title="Tab Interface"
      description="Tabbed content navigation with multiple panels"
      preview={
        <div className="w-full">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="w-full grid-cols-3">
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Analytics</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4 p-4 border-2 border-neo-text bg-neo-bg">
              <h3 className="font-bold mb-2">Overview Content</h3>
              <p>This is the overview tab content area.</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4 p-4 border-2 border-neo-text bg-neo-bg">
              <h3 className="font-bold mb-2">Analytics Content</h3>
              <p>This is the analytics tab content area.</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4 p-4 border-2 border-neo-text bg-neo-bg">
              <h3 className="font-bold mb-2">Settings Content</h3>
              <p>This is the settings tab content area.</p>
            </TabsContent>
          </Tabs>
        </div>
      }
      code={`<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Analytics</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <h3>Overview Content</h3>
    <p>Tab content goes here</p>
  </TabsContent>
</Tabs>`}
    />

    <ComponentShowcase
      title="Accordion Menu"
      description="Collapsible content sections with nested information"
      preview={
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Getting Started
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                Learn the basics of using our design system and component library.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Component Usage
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                Detailed documentation on how to use each component effectively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Customization
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                Guidelines for customizing components to fit your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
      code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Getting Started</AccordionTrigger>
    <AccordionContent>
      Learn the basics of using our design system.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Component Usage</AccordionTrigger>
    <AccordionContent>
      Detailed documentation for each component.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
    />

    <ComponentShowcase
      title="Data Table"
      description="Complete table with headers, data, and actions"
      preview={
        <div className="w-full border-2 border-neo-text">
          <Table>
            <TableHeader>
              <TableRow className="border-b-4 border-neo-text">
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-2 border-neo-text">
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell><Badge>Admin</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell><Badge variant="secondary">User</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      }
      code={`<Table>
  <TableHeader>
    <TableRow className="border-b-4 border-neo-text">
      <TableHead className="font-bold">Name</TableHead>
      <TableHead className="font-bold">Email</TableHead>
      <TableHead className="font-bold">Role</TableHead>
      <TableHead className="font-bold">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Button size="sm" variant="outline">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`}
    />

    <ComponentShowcase
      title="Interactive Dialogs"
      description="Modal dialogs for user interactions and confirmations"
      preview={
        <div className="flex gap-4 w-full justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed with this action?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Side Panel</SheetTitle>
                <SheetDescription>
                  This is a side panel for additional content or forms.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <p>Panel content goes here...</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      }
      code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </DialogContent>
</Dialog>`}
    />
  </div>
)

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState("atoms")

  const renderSection = () => {
    switch (activeSection) {
      case "atoms":
        return (
          <AtomicSection 
            title="Atoms" 
            description="The basic building blocks of our design system"
          >
            <TypographyShowcase />
            <ColorSystemShowcase />
            <SpacingSystemShowcase />
            <IconsShowcase />
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
            <ComponentShowcase
              title="Page Layout"
              description="Standard page structure with header, content, and footer"
              preview={
                <div className="w-full border-2 border-neo-text bg-neo-bg min-h-48">
                  <div className="border-b-2 border-neo-text p-4 bg-neo-interactive-bg">
                    <div className="text-sm font-bold">Header</div>
                  </div>
                  <div className="p-8 flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2">Main Content Area</div>
                      <div className="text-sm text-muted-foreground">Page content goes here</div>
                    </div>
                  </div>
                  <div className="border-t-2 border-neo-text p-4 bg-neo-interactive-bg">
                    <div className="text-sm font-bold">Footer</div>
                  </div>
                </div>
              }
              code={`<div className="min-h-screen flex flex-col">
  <header className="border-b-2 border-neo-text p-4 bg-neo-interactive-bg">
    <h1>Site Header</h1>
  </header>
  <main className="flex-1 p-8">
    <div className="max-w-6xl mx-auto">
      Main content area
    </div>
  </main>
  <footer className="border-t-2 border-neo-text p-4 bg-neo-interactive-bg">
    Site Footer
  </footer>
</div>`}
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
        <AtomicNavigation 
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
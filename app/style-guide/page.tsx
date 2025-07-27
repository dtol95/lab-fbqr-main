"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Check, Mail, Phone, MessageSquare, Link as LinkIcon, Type, Wifi } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


// Enhanced component showcase with better visual examples
const ComponentExample = ({ 
  title, 
  description, 
  preview, 
  codeExamples 
}: { 
  title: string; 
  description: string; 
  preview: React.ReactNode;
  codeExamples: { label: string; code: string }[];
}) => {
  const [copied, setCopied] = useState<string | null>(null)
  
  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="mb-8 shadow-neo-large">
      <CardHeader className="border-b-2 border-neo-text">
        <CardTitle className="font-heading text-2xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Visual Preview */}
        <div className="p-8 bg-white border-b-2 border-neo-text overflow-hidden">
          <div className="flex flex-wrap items-start justify-center gap-4 max-w-full">
            {preview}
          </div>
        </div>
        
        {/* Code Examples with Tabs */}
        <div className="p-6">
          <Tabs defaultValue={codeExamples[0]?.label} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              {codeExamples.slice(0, 3).map((example) => (
                <TabsTrigger key={example.label} value={example.label} className="font-mono text-xs">
                  {example.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {codeExamples.map((example) => (
              <TabsContent key={example.label} value={example.label}>
                <div className="relative">
                  <div className="relative bg-neo-text text-neo-bg p-4 font-mono text-sm overflow-x-auto">
                    <button
                      onClick={() => copyToClipboard(example.code, example.label)}
                      className="absolute top-2 right-2 p-2 hover:bg-neo-bg/20 rounded transition-colors"
                    >
                      {copied === example.label ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <pre className="whitespace-pre-wrap pr-12">{example.code}</pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

// Better shadow demonstration component
const ShadowShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow mx-auto flex items-center justify-center font-bold">
        DEFAULT
      </div>
      <p className="font-mono text-sm">neo-shadow</p>
      <p className="text-xs text-muted-foreground">4px offset shadow</p>
    </div>
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-large mx-auto flex items-center justify-center font-bold">
        LARGE
      </div>
      <p className="font-mono text-sm">neo-shadow-large</p>
      <p className="text-xs text-muted-foreground">8px offset shadow</p>
    </div>
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-shadow-none mx-auto flex items-center justify-center font-bold">
        NONE
      </div>
      <p className="font-mono text-sm">neo-shadow-none</p>
      <p className="text-xs text-muted-foreground">No shadow</p>
    </div>
  </div>
)

// Interactive demonstration component
const InteractionShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-interactive mx-auto flex items-center justify-center font-bold cursor-pointer">
        HOVER
      </div>
      <p className="font-mono text-sm">neo-interactive</p>
      <p className="text-xs text-muted-foreground">Standard hover effects</p>
    </div>
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-enhanced mx-auto flex items-center justify-center font-bold cursor-pointer">
        HOVER
      </div>
      <p className="font-mono text-sm">neo-enhanced</p>
      <p className="text-xs text-muted-foreground">Enhanced interactions</p>
    </div>
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-neo-bg border-2 border-neo-text neo-static mx-auto flex items-center justify-center font-bold">
        STATIC
      </div>
      <p className="font-mono text-sm">neo-static</p>
      <p className="text-xs text-muted-foreground">No interactions</p>
    </div>
  </div>
)

export default function StyleGuidePage() {
  const [user] = useState(null)
  const [demoCheckbox, setDemoCheckbox] = useState(false)
  const [demoSwitch, setDemoSwitch] = useState(false)

  return (
    <div className="bg-page-bg min-h-screen p-4 sm:p-6 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-5xl md:text-6xl">Component System</h1>
        <Link
          href="/fbqr"
          className="inline-flex items-center gap-2 font-bold font-mono uppercase hover:underline text-sm"
        >
          <ArrowLeft size={16} />
          Back to App
        </Link>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Shadow System */}
        <ComponentExample
          title="Shadow System"
          description="Brutalist shadow variants that create depth and hierarchy with clear visual differences."
          preview={<ShadowShowcase />}
          codeExamples={[
            {
              label: "Basic Usage",
              code: `// Apply shadow classes directly
<div className="neo-shadow">Default shadow</div>
<div className="neo-shadow-large">Large shadow</div>
<div className="neo-shadow-none">No shadow</div>

// Or use with components
<Button shadow="default">Default</Button>
<Button shadow="large">Large</Button>
<Button shadow="none">None</Button>`
            },
            {
              label: "CSS Variables",
              code: `/* Shadow CSS Variables */
--neo-shadow-default: 4px 4px 0px var(--neo-border-color);
--neo-shadow-large: 8px 8px 0px var(--neo-border-color);
--neo-shadow-none: none;

/* Interactive shadows */
--neo-shadow-hover: 2px 2px 0px var(--neo-border-color);
--neo-shadow-active: 0px 0px 0px var(--neo-border-color);`
            },
            {
              label: "Custom Usage",
              code: `// Custom shadow implementation
.my-element {
  box-shadow: var(--neo-shadow-default);
  transition: var(--neo-transition-default);
}

.my-element:hover {
  box-shadow: var(--neo-shadow-hover);
  transform: var(--neo-transform-hover);
}`
            }
          ]}
        />

        {/* Interaction System */}
        <ComponentExample
          title="Interaction System"
          description="Interactive behaviors that provide tactile feedback through shadow and transform changes."
          preview={<InteractionShowcase />}
          codeExamples={[
            {
              label: "Basic Usage",
              code: `// Apply interaction classes
<div className="neo-interactive">Hover me</div>
<div className="neo-enhanced">Enhanced hover</div>
<div className="neo-static">No interactions</div>

// With components
<Button interaction="default">Standard</Button>
<Button interaction="enhanced">Enhanced</Button>
<Button interaction="static">Static</Button>`
            },
            {
              label: "Transform Values",
              code: `/* Transform CSS Variables */
--neo-transform-default: translate(0px, 0px);
--neo-transform-hover: translate(2px, 2px);
--neo-transform-active: translate(4px, 4px);

/* Transition timing */
--neo-transition-default: all 0.15s ease-in-out;`
            },
            {
              label: "Custom Interactions",
              code: `// Custom interactive element
.my-interactive {
  @apply neo-element neo-shadow;
  transition: var(--neo-transition-default);
  transform: var(--neo-transform-default);
}

.my-interactive:hover {
  box-shadow: var(--neo-shadow-hover);
  transform: var(--neo-transform-hover);
}`
            }
          ]}
        />

        {/* Button Components */}
        <ComponentExample
          title="Button Components"
          description="Comprehensive button system with variants, shadows, and interaction options."
          preview={
            <>
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button shadow="large">Large Shadow</Button>
              <Button interaction="enhanced">Enhanced</Button>
            </>
          }
          codeExamples={[
            {
              label: "Variants",
              code: `import { Button } from "@/components/ui/button"

// Button variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`
            },
            {
              label: "Shadows & Interactions",
              code: `// Shadow options
<Button shadow="default">Default Shadow</Button>
<Button shadow="large">Large Shadow</Button>
<Button shadow="none">No Shadow</Button>

// Interaction options
<Button interaction="default">Standard</Button>
<Button interaction="enhanced">Enhanced</Button>
<Button interaction="static">Static</Button>`
            },
            {
              label: "Combined Options",
              code: `// Combining all options
<Button 
  variant="destructive" 
  shadow="large" 
  interaction="enhanced"
  size="lg"
>
  Critical Action
</Button>

// Responsive button group
<div className="flex flex-col sm:flex-row gap-2">
  <Button className="flex-1">Primary</Button>
  <Button variant="outline" className="flex-1">Secondary</Button>
</div>`
            }
          ]}
        />

        {/* Form Components */}
        <ComponentExample
          title="Form Components"
          description="Input fields, textareas, and form controls with consistent brutalist styling."
          preview={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Default Input</Label>
                <Input placeholder="Default input" className="w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Outline Input</Label>
                <Input variant="outline" placeholder="Outline input" className="w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Textarea</Label>
                <Textarea placeholder="Textarea" rows={3} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Select</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Checkbox</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="demo-check" 
                    checked={demoCheckbox}
                    onCheckedChange={setDemoCheckbox}
                  />
                  <Label htmlFor="demo-check">Checkbox {demoCheckbox ? '✓' : ''}</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Switch</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="demo-switch" 
                    checked={demoSwitch}
                    onCheckedChange={setDemoSwitch}
                  />
                  <Label htmlFor="demo-switch">Switch {demoSwitch ? 'ON' : 'OFF'}</Label>
                </div>
              </div>
            </div>
          }
          codeExamples={[
            {
              label: "Input Variants",
              code: `import { Input, Textarea, Label } from "@/components/ui/*"

// Input variants
<Input variant="default" placeholder="Default" />
<Input variant="outline" placeholder="Outline" />
<Input variant="ghost" placeholder="Ghost" />

// With labels
<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter name" />
</div>`
            },
            {
              label: "Form Controls",
              code: `import { Select, Checkbox, Switch } from "@/components/ui/*"

// Select dropdown
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Checkbox and Switch
<Checkbox id="agree" />
<Switch id="notifications" />`
            },
            {
              label: "Form Layout",
              code: `// Complete form example
<form className="space-y-6 max-w-md">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" rows={4} />
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">I agree to terms</Label>
  </div>
  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>`
            }
          ]}
        />

        {/* Card Components */}
        <ComponentExample
          title="Card Components"
          description="Flexible card containers with variant support for different use cases."
          preview={
            <>
              <Card variant="default" className="w-48 p-4">
                <h5 className="font-bold mb-2">Default Card</h5>
                <p className="text-sm">Standard styling</p>
              </Card>
              <Card variant="elevated" className="w-48 p-4">
                <h5 className="font-bold mb-2">Elevated Card</h5>
                <p className="text-sm">Enhanced shadow</p>
              </Card>
              <Card variant="flat" className="w-48 p-4">
                <h5 className="font-bold mb-2">Flat Card</h5>
                <p className="text-sm">Minimal styling</p>
              </Card>
            </>
          }
          codeExamples={[
            {
              label: "Card Variants",
              code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Basic card variants
<Card variant="default">
  <CardContent className="p-6">
    Standard card content
  </CardContent>
</Card>

<Card variant="elevated">
  <CardContent className="p-6">
    Enhanced shadow for prominence
  </CardContent>
</Card>

<Card variant="flat">
  <CardContent className="p-6">
    Minimal styling
  </CardContent>
</Card>`
            },
            {
              label: "Interactive Cards",
              code: `// Interactive card options
<Card interaction="default" className="cursor-pointer">
  <CardContent className="p-6">
    Standard hover effects
  </CardContent>
</Card>

<Card interaction="enhanced" className="cursor-pointer">
  <CardContent className="p-6">
    Strong hover effects
  </CardContent>
</Card>

<Card interaction="static">
  <CardContent className="p-6">
    No interactions
  </CardContent>
</Card>`
            },
            {
              label: "Card Structure",
              code: `// Full card structure
<Card variant="elevated">
  <CardHeader>
    <CardTitle className="font-heading text-xl">
      Card Title
    </CardTitle>
    <p className="text-muted-foreground">
      Card description
    </p>
  </CardHeader>
  <CardContent>
    <p>Main card content goes here.</p>
    <Button className="mt-4">Action</Button>
  </CardContent>
</Card>`
            }
          ]}
        />



        {/* Content Type Icons */}
        <ComponentExample
          title="Content Type System"
          description="Icon system used in the QR code generator for different content types."
          preview={
            <>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <LinkIcon className="w-5 h-5" />
                <span className="text-sm font-bold">URL</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <Type className="w-5 h-5" />
                <span className="text-sm font-bold">Text</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-bold">Email</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-bold">Phone</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-bold">SMS</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-2 border-neo-text bg-neo-bg">
                <Wifi className="w-5 h-5" />
                <span className="text-sm font-bold">Wi-Fi</span>
              </div>
            </>
          }
          codeExamples={[
            {
              label: "Content Types",
              code: `import { Link, Type, Mail, Phone, MessageSquare, Wifi } from "lucide-react"

export const contentTypes = [
  { id: "url", label: "URL", icon: Link },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
]`
            },
            {
              label: "Usage in Buttons",
              code: `// Content type button grid
<div className="grid grid-cols-3 gap-2">
  {contentTypes.map((ct) => (
    <Button
      key={ct.id}
      variant={activeTab === ct.id ? "secondary" : "outline"}
      onClick={() => setActiveTab(ct.id)}
      size="sm"
      className="flex items-center gap-2"
    >
      <ct.icon className="w-4 h-4" />
      <span className="hidden sm:inline">{ct.label}</span>
    </Button>
  ))}
</div>`
            },
            {
              label: "Icon Components",
              code: `// Custom icon wrapper
const ContentTypeIcon = ({ type, active = false }) => {
  const iconType = contentTypes.find(ct => ct.id === type)
  const Icon = iconType?.icon || Link
  
  return (
    <div className={cn(
      "p-2 border-2 border-neo-text",
      active ? "bg-neo-accent" : "bg-neo-bg"
    )}>
      <Icon className="w-5 h-5" />
    </div>
  )
}`
            }
          ]}
        />

      </div>
    </div>
  )
}
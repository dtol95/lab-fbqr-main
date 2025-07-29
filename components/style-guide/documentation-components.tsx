"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Standardized Props Table Component
interface PropDefinition {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface ComponentAPIProps {
  componentName: string
  props: PropDefinition[]
  className?: string
}

export const ComponentAPI: React.FC<ComponentAPIProps> = ({ 
  componentName, 
  props, 
  className 
}) => (
  <Card className={cn("mb-6", className)}>
    <CardHeader>
      <CardTitle className="text-lg font-bold uppercase">
        {componentName} API
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-neo-text">
              <TableHead className="font-bold w-1/4">Prop</TableHead>
              <TableHead className="font-bold w-1/4">Type</TableHead>
              <TableHead className="font-bold w-1/6">Default</TableHead>
              <TableHead className="font-bold">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.map((prop) => (
              <TableRow key={prop.name} className="border-b border-neo-text">
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    {prop.name}
                    {prop.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-blue-600">
                  {prop.type}
                </TableCell>
                <TableCell className="font-mono text-sm text-gray-600">
                  {prop.default || '—'}
                </TableCell>
                <TableCell className="text-sm">
                  {prop.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
)

// Accessibility Documentation Component
interface AccessibilityNoteProps {
  ariaLabels?: string[]
  keyboardControls?: Array<{ key: string; action: string }>
  focusManagement?: string[]
  screenReader?: string[]
  contrastCompliance?: boolean
  className?: string
}

export const AccessibilityNote: React.FC<AccessibilityNoteProps> = ({
  ariaLabels,
  keyboardControls,
  focusManagement,
  screenReader,
  contrastCompliance = true,
  className
}) => (
  <Alert className={cn("mb-6 border-[var(--neo-info)]", className)}>
    <AlertDescription>
      <div className="space-y-3">
        <h4 className="font-bold uppercase text-sm">♿ Accessibility Guidelines</h4>
        
        {ariaLabels && ariaLabels.length > 0 && (
          <div>
            <h5 className="font-medium text-sm mb-1">ARIA Labels:</h5>
            <ul className="text-sm space-y-1">
              {ariaLabels.map((label, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[var(--neo-info)] mt-1">•</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {keyboardControls && keyboardControls.length > 0 && (
          <div>
            <h5 className="font-medium text-sm mb-1">Keyboard Controls:</h5>
            <ul className="text-sm space-y-1">
              {keyboardControls.map((control, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {control.key}
                  </Badge>
                  <span>{control.action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {focusManagement && focusManagement.length > 0 && (
          <div>
            <h5 className="font-medium text-sm mb-1">Focus Management:</h5>
            <ul className="text-sm space-y-1">
              {focusManagement.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[var(--neo-info)] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {screenReader && screenReader.length > 0 && (
          <div>
            <h5 className="font-medium text-sm mb-1">Screen Reader Support:</h5>
            <ul className="text-sm space-y-1">
              {screenReader.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[var(--neo-info)] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-[var(--neo-text)]/20">
          <span className="text-sm font-medium">WCAG Compliance:</span>
          <Badge variant={contrastCompliance ? "success" : "warning"}>
            {contrastCompliance ? "AA Compliant" : "Review Required"}
          </Badge>
        </div>
      </div>
    </AlertDescription>
  </Alert>
)

// Best Practices Component
interface BestPracticesProps {
  dos?: string[]
  donts?: string[]
  tips?: string[]
  className?: string
}

export const BestPractices: React.FC<BestPracticesProps> = ({
  dos,
  donts,
  tips,
  className
}) => (
  <Card className={cn("mb-6", className)}>
    <CardHeader>
      <CardTitle className="text-lg font-bold uppercase">
        💡 Best Practices
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="dos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dos">Do's</TabsTrigger>
          <TabsTrigger value="donts">Don'ts</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dos" className="mt-4">
          {dos && dos.length > 0 ? (
            <ul className="space-y-2">
              {dos.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--neo-success)] font-bold mt-1">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific recommendations.</p>
          )}
        </TabsContent>
        
        <TabsContent value="donts" className="mt-4">
          {donts && donts.length > 0 ? (
            <ul className="space-y-2">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--neo-destructive)] font-bold mt-1">✗</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific restrictions.</p>
          )}
        </TabsContent>
        
        <TabsContent value="tips" className="mt-4">
          {tips && tips.length > 0 ? (
            <ul className="space-y-2">
              {tips.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--neo-info)] font-bold mt-1">💡</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No additional tips available.</p>
          )}
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
)

// Component States Matrix
interface StateDefinition {
  name: string
  description: string
  example: React.ReactNode
}

interface ComponentStatesProps {
  componentName: string
  states: StateDefinition[]
  className?: string
}

export const ComponentStates: React.FC<ComponentStatesProps> = ({
  componentName,
  states,
  className
}) => (
  <Card className={cn("mb-6", className)}>
    <CardHeader>
      <CardTitle className="text-lg font-bold uppercase">
        {componentName} States
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        {states.map((state, index) => (
          <div key={index} className="border-2 border-neo-text p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <h4 className="font-bold uppercase text-sm mb-1">{state.name}</h4>
                <p className="text-xs text-muted-foreground">{state.description}</p>
              </div>
              <div className="md:col-span-2 flex justify-center">
                {state.example}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Variant Matrix Component
interface VariantExample {
  name: string
  description: string
  example: React.ReactNode
  code?: string
}

interface VariantMatrixProps {
  componentName: string
  variants: VariantExample[]
  className?: string
}

export const VariantMatrix: React.FC<VariantMatrixProps> = ({
  componentName,
  variants,
  className
}) => (
  <Card className={cn("mb-6", className)}>
    <CardHeader>
      <CardTitle className="text-lg font-bold uppercase">
        {componentName} Variants
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {variants.map((variant, index) => (
          <div key={index} className="border border-neo-text p-4 space-y-3">
            <div className="text-center">
              <h4 className="font-bold text-sm uppercase mb-1">{variant.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{variant.description}</p>
              <div className="flex justify-center">
                {variant.example}
              </div>
            </div>
            {variant.code && (
              <div className="bg-neo-text text-neo-bg p-2 font-mono text-xs">
                <pre className="whitespace-pre-wrap">{variant.code}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Usage Examples Component  
interface UsageExample {
  title: string
  description: string
  code: string
  preview: React.ReactNode
}

interface UsageExamplesProps {
  componentName: string
  examples: UsageExample[]
  className?: string
}

export const UsageExamples: React.FC<UsageExamplesProps> = ({
  componentName,
  examples,
  className
}) => (
  <Card className={cn("mb-6", className)}>
    <CardHeader>
      <CardTitle className="text-lg font-bold uppercase">
        {componentName} Usage Examples
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {examples.map((example, index) => (
          <div key={index} className="border-2 border-neo-text">
            <div className="border-b-2 border-neo-text p-4 bg-neo-muted-bg">
              <h4 className="font-bold text-sm uppercase mb-1">{example.title}</h4>
              <p className="text-xs text-muted-foreground">{example.description}</p>
            </div>
            <div className="p-6 bg-white">
              <div className="flex justify-center">
                {example.preview}
              </div>
            </div>
            <div className="bg-neo-text text-neo-bg p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">{example.code}</pre>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
/**
 * Brutalist Component Showcase
 * 
 * This component demonstrates all the brutalist component variants
 * and serves as both documentation and testing for the system.
 */

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  BrutalistShadowVariant,
  BrutalistInteractionVariant,
  BrutalistButtonVariant,
  BrutalistInputVariant,
  BrutalistCardVariant,
} from "@/types/brutalist"

interface ShowcaseSection {
  title: string
  description: string
  children: React.ReactNode
}

const ShowcaseSection: React.FC<ShowcaseSection> = ({ title, description, children }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="neo-heading">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        {children}
      </div>
    </CardContent>
  </Card>
)

const BrutalistShowcase: React.FC = () => {
  const shadowVariants: BrutalistShadowVariant[] = ["default", "large", "none"]
  const interactionVariants: BrutalistInteractionVariant[] = ["default", "static", "enhanced"]
  const buttonVariants: BrutalistButtonVariant[] = ["default", "destructive", "outline", "secondary", "ghost", "link"]
  const inputVariants: BrutalistInputVariant[] = ["default", "outline", "ghost"]
  const cardVariants: BrutalistCardVariant[] = ["default", "elevated", "flat"]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="neo-heading text-4xl mb-4">Brutalist Component System</h1>
        <p className="neo-text text-lg">
          Comprehensive showcase of all brutalist component variants with shadow and interaction options
        </p>
      </div>

      {/* Shadow Variants Showcase */}
      <ShowcaseSection
        title="Shadow Variants"
        description="All components support three shadow variants: default (4px), large (8px), and none."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shadowVariants.map((shadow) => (
            <div key={shadow} className="space-y-2">
              <h4 className="neo-text-bold capitalize">{shadow} Shadow</h4>
              <Button shadow={shadow} className="w-full">
                Button {shadow}
              </Button>
              <Input shadow={shadow} placeholder={`Input ${shadow}`} />
              <Card shadow={shadow} className="p-4">
                <p className="neo-text">Card {shadow}</p>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Interaction Variants Showcase */}
      <ShowcaseSection
        title="Interaction Variants"
        description="Components can have different interaction behaviors: default (standard), static (no interactions), and enhanced (stronger effects)."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interactionVariants.map((interaction) => (
            <div key={interaction} className="space-y-2">
              <h4 className="neo-text-bold capitalize">{interaction} Interaction</h4>
              <Button interaction={interaction} className="w-full">
                Button {interaction}
              </Button>
              <Input interaction={interaction} placeholder={`Input ${interaction}`} />
              <Card interaction={interaction} className="p-4">
                <p className="neo-text">Card {interaction}</p>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Button Variants Showcase */}
      <ShowcaseSection
        title="Button Variants"
        description="All button variants with their default brutalist styling."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant} className="w-full">
              {variant}
            </Button>
          ))}
        </div>
      </ShowcaseSection>

      {/* Input Variants Showcase */}
      <ShowcaseSection
        title="Input Variants"
        description="All input variants with brutalist styling and interactions."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inputVariants.map((variant) => (
            <Input
              key={variant}
              variant={variant}
              placeholder={`${variant} input`}
            />
          ))}
        </div>
      </ShowcaseSection>

      {/* Card Variants Showcase */}
      <ShowcaseSection
        title="Card Variants"
        description="All card variants with different shadow and interaction behaviors."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardVariants.map((variant) => (
            <Card key={variant} variant={variant} className="p-4">
              <h4 className="neo-text-bold capitalize mb-2">{variant} Card</h4>
              <p className="neo-text">
                This is a {variant} card variant demonstrating the brutalist styling system.
              </p>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      {/* Combined Variants Showcase */}
      <ShowcaseSection
        title="Combined Variants"
        description="Examples of components using multiple variant combinations."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card shadow="large" interaction="enhanced" className="p-6">
            <h4 className="neo-text-bold mb-4">Enhanced Large Shadow Card</h4>
            <div className="space-y-3">
              <Button variant="default" shadow="large" interaction="enhanced">
                Enhanced Button
              </Button>
              <Input variant="outline" shadow="large" interaction="enhanced" placeholder="Enhanced input" />
            </div>
          </Card>

          <Card shadow="none" interaction="static" className="p-6">
            <h4 className="neo-text-bold mb-4">Static No Shadow Card</h4>
            <div className="space-y-3">
              <Button variant="outline" shadow="none" interaction="static">
                Static Button
              </Button>
              <Input variant="ghost" shadow="none" interaction="static" placeholder="Static input" />
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      {/* Backward Compatibility Showcase */}
      <ShowcaseSection
        title="Backward Compatibility"
        description="Components maintain backward compatibility with the noShadow prop."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="neo-text-bold">With noShadow prop</h4>
            <Button noShadow>Button without shadow</Button>
            <Input noShadow placeholder="Input without shadow" />
            <Card noShadow className="p-4">
              <p className="neo-text">Card without shadow</p>
            </Card>
          </div>
          <div className="space-y-2">
            <h4 className="neo-text-bold">With shadow="none"</h4>
            <Button shadow="none">Button without shadow</Button>
            <Input shadow="none" placeholder="Input without shadow" />
            <Card shadow="none" className="p-4">
              <p className="neo-text">Card without shadow</p>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      {/* Usage Examples */}
      <ShowcaseSection
        title="Usage Examples"
        description="Real-world usage examples showing how to combine variants effectively."
      >
        <div className="space-y-6">
          {/* Primary Action Section */}
          <div className="neo-container">
            <h4 className="neo-text-bold mb-4">Primary Action Section</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="default" shadow="large" interaction="enhanced" className="flex-1">
                Primary Action
              </Button>
              <Button variant="outline" shadow="default" interaction="default" className="flex-1">
                Secondary Action
              </Button>
              <Button variant="ghost" shadow="none" interaction="static" className="flex-1">
                Tertiary Action
              </Button>
            </div>
          </div>

          {/* Form Section */}
          <div className="neo-container">
            <h4 className="neo-text-bold mb-4">Form Section</h4>
            <div className="space-y-3">
              <Input variant="default" shadow="default" placeholder="Name" />
              <Input variant="default" shadow="default" placeholder="Email" type="email" />
              <Input variant="outline" shadow="default" placeholder="Optional field" />
              <Button variant="default" shadow="large" interaction="enhanced" className="w-full">
                Submit Form
              </Button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="elevated" shadow="large" interaction="enhanced" className="p-4">
              <h4 className="neo-text-bold mb-2">Metric Card</h4>
              <p className="neo-text text-2xl font-bold">1,234</p>
              <p className="neo-text text-sm">Total Users</p>
            </Card>
            <Card variant="default" shadow="default" interaction="default" className="p-4">
              <h4 className="neo-text-bold mb-2">Status Card</h4>
              <p className="neo-text">System Online</p>
            </Card>
            <Card variant="flat" shadow="none" interaction="static" className="p-4">
              <h4 className="neo-text-bold mb-2">Info Card</h4>
              <p className="neo-text">Additional information</p>
            </Card>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}

export default BrutalistShowcase
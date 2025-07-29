/**
 * Brutalist Component System Types
 * 
 * This file defines comprehensive TypeScript interfaces for the brutalist
 * component variants including shadow, interaction, and styling options.
 */

// Base brutalist variant types
export type BrutalistShadowVariant = 'default' | 'large' | 'none'
export type BrutalistInteractionVariant = 'default' | 'static' | 'enhanced'
export type BrutalistSizeVariant = 'sm' | 'default' | 'lg'

// Component-specific variant types
export type BrutalistButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type BrutalistInputVariant = 'default' | 'outline' | 'ghost'
export type BrutalistCardVariant = 'default' | 'elevated' | 'flat'

// Base brutalist component props interface
export interface BrutalistComponentProps {
  /**
   * Shadow variant for the component
   * - default: Standard 4px shadow with hover interactions
   * - large: Enhanced 8px shadow for elevated elements
   * - none: No shadow applied
   */
  shadow?: BrutalistShadowVariant

  /**
   * Interaction behavior for the component
   * - default: Standard hover/active interactions with shadow and transform
   * - static: No interactive behaviors, maintains shadow but no transforms
   * - enhanced: Stronger interactions with larger shadows and transforms
   */
  interaction?: BrutalistInteractionVariant

  /**
   * Backward compatibility prop to disable shadows
   * @deprecated Use shadow="none" instead
   */
  noShadow?: boolean
}

// Button-specific props extending base brutalist props
export interface BrutalistButtonProps extends BrutalistComponentProps {
  /**
   * Button visual variant
   * - default: Accent background with dark text
   * - destructive: Destructive accent background
   * - outline: Transparent background with border
   * - secondary: Interactive background
   * - ghost: No border or shadow, minimal styling
   * - link: Text-only appearance with underline
   */
  variant?: BrutalistButtonVariant

  /**
   * Button size variant
   */
  size?: BrutalistSizeVariant | 'icon'
}

// Input-specific props extending base brutalist props
export interface BrutalistInputProps extends BrutalistComponentProps {
  /**
   * Input visual variant
   * - default: Interactive background with border
   * - outline: Transparent background with border
   * - ghost: No border or background
   */
  variant?: BrutalistInputVariant
}

// Card-specific props extending base brutalist props
export interface BrutalistCardProps extends BrutalistComponentProps {
  /**
   * Card visual variant
   * - default: Standard card styling
   * - elevated: Enhanced shadow for prominence
   * - flat: Minimal styling with reduced shadow
   */
  variant?: BrutalistCardVariant
}

// Comprehensive brutalist design tokens interface
export interface BrutalistDesignTokens {
  colors: {
    background: string
    foreground: string
    accent: string
    border: string
    interactive: string
    destructive: string
    muted: string
  }
  shadows: {
    default: string
    hover: string
    active: string
    large: string
    none: string
  }
  transforms: {
    default: string
    hover: string
    active: string
  }
  borders: {
    width: string
    style: string
    radius: string
  }
  transitions: {
    default: string
  }
  opacity: {
    disabled: string
    hover: string
  }
  typography: {
    fontWeightNormal: string
    fontWeightBold: string
    fontWeightHeading: string
    letterSpacingTight: string
    textTransformHeading: string
  }
}

// Utility type for extracting variant props from component interfaces
export type ExtractVariantProps<T> = Pick<T, 'shadow' | 'interaction' | 'variant' | 'size'>

// Helper type for creating component variant configurations
export interface BrutalistVariantConfig<T extends string = string> {
  variants: {
    [K in keyof BrutalistComponentProps]: Record<string, string>
  } & {
    variant?: Record<T, string>
    size?: Record<string, string>
  }
  defaultVariants: Partial<BrutalistComponentProps & { variant?: T; size?: string }>
}

// CSS class name mapping for brutalist variants
export interface BrutalistClassNames {
  shadow: {
    default: 'neo-shadow'
    large: 'neo-shadow-large'
    none: 'neo-shadow-none'
  }
  interaction: {
    default: 'neo-interactive'
    static: 'neo-static'
    enhanced: 'neo-enhanced'
  }
  element: 'neo-element'
  button: 'neo-button'
  input: 'neo-input'
  card: 'neo-card'
}

// Type guard functions for variant validation
export const isBrutalistShadowVariant = (value: string): value is BrutalistShadowVariant => {
  return ['default', 'large', 'none'].includes(value)
}

export const isBrutalistInteractionVariant = (value: string): value is BrutalistInteractionVariant => {
  return ['default', 'static', 'enhanced'].includes(value)
}

export const isBrutalistButtonVariant = (value: string): value is BrutalistButtonVariant => {
  return ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(value)
}

// Constants for brutalist design system
export const BRUTALIST_SHADOWS = {
  DEFAULT: 'neo-shadow',
  LARGE: 'neo-shadow-large',
  NONE: 'neo-shadow-none',
} as const

export const BRUTALIST_INTERACTIONS = {
  DEFAULT: 'neo-interactive',
  STATIC: 'neo-static',
  ENHANCED: 'neo-enhanced',
} as const

export const BRUTALIST_ELEMENTS = {
  BASE: 'neo-element',
  BUTTON: 'neo-button',
  INPUT: 'neo-input',
  CARD: 'neo-card',
} as const

// Export type for CSS variable names used in the brutalist system
export type BrutalistCSSVariable =
  | '--neo-bg'
  | '--neo-interactive-bg'
  | '--neo-text'
  | '--neo-accent'
  | '--neo-border-color'
  | '--neo-shadow-default'
  | '--neo-shadow-hover'
  | '--neo-shadow-active'
  | '--neo-shadow-large'
  | '--neo-shadow-none'
  | '--neo-transform-default'
  | '--neo-transform-hover'
  | '--neo-transform-active'
  | '--neo-transition-default'
  | '--neo-opacity-disabled'
  | '--neo-opacity-hover'
  | '--neo-border-width'
  | '--neo-border-style'
  | '--neo-border-radius'
  | '--neo-font-weight-normal'
  | '--neo-font-weight-bold'
  | '--neo-font-weight-heading'
  | '--neo-letter-spacing-tight'
  | '--neo-text-transform-heading'
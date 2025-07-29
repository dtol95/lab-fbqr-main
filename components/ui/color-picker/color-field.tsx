import * as React from 'react'
import { ColorPicker, ColorValue } from './color-picker'
import { ColorSwatch } from './color-swatch'
import { solidCss } from './color-utils'
import type { Gradient } from '@/types'

interface ColorFieldProps {
  label?: string
  // New unified API
  value?: ColorValue
  onChange?: (v: ColorValue) => void
  // Legacy API for backward compatibility - solid color only
  color?: string
  onColorChange?: (color: string) => void
  // Gradient props (ignored - for backward compatibility only)
  useGradient?: boolean
  onUseGradientChange?: (use: boolean) => void
  gradient?: Gradient
  onGradientChange?: (gradient: Gradient) => void
  allowGradient?: boolean
  className?: string
}

export function ColorField({ 
  label = 'Color', 
  value,
  onChange,
  color,
  onColorChange,
  // Gradient props are ignored - use GradientControls component instead
  useGradient,
  onUseGradientChange,
  gradient,
  onGradientChange,
  allowGradient,
  className
}: ColorFieldProps) {
  // Determine which API is being used
  const isNewApi = value !== undefined && onChange !== undefined
  const isLegacyApi = color !== undefined && onColorChange !== undefined

  // Create unified value for internal use
  const internalValue: ColorValue = React.useMemo(() => {
    if (isNewApi) {
      return value!
    } else if (isLegacyApi) {
      return { hex: color! }
    } else {
      return { hex: '#1C1C1C' }
    }
  }, [isNewApi, value, isLegacyApi, color])

  // Handle changes
  const handleChange = React.useCallback((newValue: ColorValue) => {
    if (isNewApi) {
      onChange!(newValue)
    } else if (isLegacyApi) {
      onColorChange!(newValue.hex)
    }
  }, [isNewApi, onChange, isLegacyApi, onColorChange])

  const preview = internalValue.hex

  return (
    <div className={`space-neo-sm ${className || ''}`}>
      <div className="text-xs font-semibold uppercase text-[rgb(var(--neo-text))]">{label}</div>
      <ColorPicker 
        value={internalValue} 
        onChange={handleChange} 
      />
      <div className="flex items-center gap-2 text-xs text-[rgb(var(--neo-text))]/80">
        <ColorSwatch color={preview} size="sm" />
        <code className="font-mono truncate">{preview}</code>
      </div>
    </div>
  )
}
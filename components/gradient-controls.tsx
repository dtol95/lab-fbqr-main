"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ColorField } from "@/components/ui/color-picker/color-field"
import { BrutalistSlider } from "@/components/ui/brutalist-slider"
import { FormField, ColorControls, ColorGrid } from "@/components/ui/form-layout"
import type { Gradient } from "@/types"
import { AnimatePresence, motion } from "framer-motion"

interface GradientControlsProps {
  label: string
  color: string
  onColorChange: (color: string) => void
  useGradient: boolean
  onUseGradientChange: (use: boolean) => void
  gradient: Gradient
  onGradientChange: (gradient: Gradient) => void
}

export function GradientControls({
  label,
  color,
  onColorChange,
  useGradient,
  onUseGradientChange,
  gradient,
  onGradientChange,
}: GradientControlsProps) {
  const handleGradientPropChange = (prop: keyof Gradient, value: any) => {
    onGradientChange({ ...gradient, [prop]: value })
  }

  const handleColorStopChange = (index: number, newColor: string) => {
    const newColorStops = [...(gradient.colorStops || [])]
    newColorStops[index] = { ...(newColorStops[index] || { offset: index }), color: newColor }
    handleGradientPropChange("colorStops", newColorStops)
  }

  return (
    <FormField>
      <ColorControls>
        <Checkbox
          id={`use-gradient-${label}`}
          checked={useGradient}
          onCheckedChange={(checked) => onUseGradientChange(Boolean(checked))}
        />
        <Label htmlFor={`use-gradient-${label}`} className="font-sans uppercase font-bold text-base">
          Use Gradient
        </Label>
      </ColorControls>

      <AnimatePresence initial={false}>
        {useGradient ? (
          <motion.div
            key="gradient-controls"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-neo-md pt-neo-sm pb-2">
              <ColorGrid columns={2}>
                <ColorField
                  color={gradient?.colorStops[0]?.color || "#ff0000"}
                  onColorChange={(c) => handleColorStopChange(0, c)}
                />
                <ColorField
                  color={gradient?.colorStops[1]?.color || "#0000ff"}
                  onColorChange={(c) => handleColorStopChange(1, c)}
                />
              </ColorGrid>
              <FormField>
                <div className="flex justify-between items-center">
                  <Label htmlFor={`angle-slider-${label}`} className="font-sans font-bold uppercase text-sm">
                    Angle
                  </Label>
                  <span className="font-mono text-sm font-bold">{gradient?.rotation || 0}°</span>
                </div>
                <BrutalistSlider
                  id={`angle-slider-${label}`}
                  value={[gradient?.rotation || 0]}
                  max={360}
                  step={1}
                  onValueChange={(v) => handleGradientPropChange("rotation", v[0])}
                />
              </FormField>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="solid-color"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-neo-sm pb-2">
              <ColorField color={color} onColorChange={onColorChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormField>
  )
}

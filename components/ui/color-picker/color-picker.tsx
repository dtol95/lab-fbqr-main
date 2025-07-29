import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverBody } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ColorSwatch } from './color-swatch'
import { BrutalistSlider } from '@/components/ui/brutalist-slider'
import { CloseButton } from '@/components/ui/close-button'
import { hexToHsv, hsvToHex, clamp } from './color-utils'
import { Pipette, Copy } from 'lucide-react'

export type ColorValue = {
  hex: string
}

type Props = {
  value: ColorValue
  onChange: (v: ColorValue) => void
  presets?: string[]
  className?: string
}

export function ColorPicker({ 
  value, 
  onChange, 
  presets = [
    // Brand Colors
    '#1C1C1C', '#E0E0E0', '#F0F0F0', '#E3FF32', '#E74C3C', '#32CD32', 
    '#FF8C00', '#4169E1', '#D1D1D1',
    // Common Colors  
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#808080'
  ], 
  className 
}: Props) {
  const [open, setOpen] = React.useState(false)

  // HSV as single source of truth for colors
  const propHSV = React.useMemo(() => hexToHsv(value.hex), [value.hex])
  const [hsv, setHSV] = React.useState(propHSV)

  // Sync internal state when parent changes externally
  React.useEffect(() => { setHSV(propHSV) }, [propHSV.h, propHSV.s, propHSV.v])

  // Push color changes to parent
  const prevRef = React.useRef<string>('')
  React.useEffect(() => {
    const hex = hsvToHex(hsv.h, hsv.s, hsv.v)
    if (prevRef.current !== hex) {
      prevRef.current = hex
      onChange({ hex })
    }
  }, [hsv.h, hsv.s, hsv.v, onChange])


  async function pickWithEyeDropper() {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        const ed = new (window as any).EyeDropper()
        const res = await ed.open()
        const hsvPicked = hexToHsv(res.sRGBHex)
        setHSV(hsvPicked)
      } catch {}
    }
  }

  function copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentHex)
    }
  }

  function resetColor() {
    setHSV({ h: 0, s: 0, v: 11 }) // Reset to #1C1C1C
  }

  // 2D SV panel interaction
  const areaRef = React.useRef<HTMLDivElement>(null)
  const onAreaPointer = (e: React.PointerEvent) => {
    const el = areaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100)     // S 0..100
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100)     // V 0..100 (invert)
    setHSV(prev => ({ ...prev, s: x, v: 100 - y }))
  }

  // Hue bar interaction
  const hueRef = React.useRef<HTMLDivElement>(null)
  const onHuePointer = (e: React.PointerEvent) => {
    const el = hueRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const y = clamp(((e.clientY - rect.top) / rect.height) * 360, 0, 360)
    setHSV(prev => ({ ...prev, h: y }))
  }

  // CSS for 2D SV area: base hue + white/black overlays
  const areaBg = {
    background: `
      linear-gradient(to top, #000, transparent),
      linear-gradient(to right, #fff, rgba(255,255,255,0)),
      hsl(${Math.round(hsv.h)} 100% 50%)`
  }

  const thumbX = `${hsv.s}%`
  const thumbY = `${100 - hsv.v}%`

  const currentHex = hsvToHex(hsv.h, hsv.s, hsv.v)
  const cssPreview = currentHex

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={[
            'w-full flex items-center gap-neo-md p-2 border-2 border-[rgb(var(--neo-text))] rounded-none',
            'hover:bg-[rgb(var(--neo-interactive-bg))] transition-neo shadow-neo text-left',
            className
          ].join(' ')}
        >
          <ColorSwatch color={cssPreview} />
          <span className="font-mono text-sm">{currentHex}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" side="bottom" className="w-[320px] max-w-[95vw]">
        <PopoverHeader>
          <div className="flex items-center justify-between gap-neo-md pb-3 border-b-2 border-[rgb(var(--neo-text))]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[rgb(var(--neo-text))]" style={{ background: cssPreview }} />
              <span className="font-bold uppercase tracking-wide text-sm">Color Picker</span>
            </div>
            <div className="flex items-center gap-2">
              {typeof window !== 'undefined' && 'EyeDropper' in window && (
                <Button variant="outline" size="sm" onClick={pickWithEyeDropper}>
                  <Pipette className="w-4 h-4" />
                  <span className="sr-only">Eyedropper</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
                <span className="sr-only">Copy HEX</span>
              </Button>
              <CloseButton onClick={() => setOpen(false)} />
            </div>
          </div>
        </PopoverHeader>
        
        <PopoverBody>
          <div className="mt-3 space-neo-md">
            {/* SV Panel + Hue Bar */}
            <div className="flex gap-neo-sm justify-center">
              <div
                ref={areaRef}
                onPointerDown={(e) => { 
                  (e.target as HTMLElement).setPointerCapture(e.pointerId)
                  onAreaPointer(e) 
                }}
                onPointerMove={(e) => { 
                  if ((e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) onAreaPointer(e) 
                }}
                className="relative w-[220px] h-[160px] border-2 border-[rgb(var(--neo-text))] rounded-none cursor-crosshair"
                style={areaBg}
                aria-label="Saturation/Value"
                role="application"
              >
                <div
                  className="absolute -ml-2 -mt-2 w-3 h-3 border-2 border-[rgb(var(--neo-text))] rounded-full bg-white"
                  style={{ left: thumbX, top: thumbY }}
                />
              </div>

              <div
                ref={hueRef}
                onPointerDown={(e) => { 
                  (e.target as HTMLElement).setPointerCapture(e.pointerId)
                  onHuePointer(e) 
                }}
                onPointerMove={(e) => { 
                  if ((e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) onHuePointer(e) 
                }}
                className="relative w-6 h-[160px] border-2 border-[rgb(var(--neo-text))] rounded-none cursor-ns-resize"
                aria-label="Hue"
                role="slider"
                style={{
                  background: `linear-gradient(to bottom,
                    #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`
                }}
              >
                <div
                  className="absolute left-0 w-full h-[2px] -mt-[1px] bg-[rgb(var(--neo-bg))] border-2 border-[rgb(var(--neo-text))]"
                  style={{ top: `${hsv.h / 360 * 100}%` }}
                />
              </div>
            </div>

            {/* HEX Value */}
            <HexField value={currentHex} onChangeHex={(hex) => {
              const hsvPicked = hexToHsv(hex)
              setHSV(hsvPicked)
            }} onCopy={copyToClipboard} />

            {/* Presets (optional) */}
            <PresetRow presets={presets} onPick={(hex) => {
              const hsvPicked = hexToHsv(hex)
              setHSV(hsvPicked)
            }} />
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// Supporting components for the 2D color picker
function HexField({ value, onChangeHex, onCopy }: { value: string, onChangeHex: (hex: string) => void, onCopy: () => void }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase mb-1 text-[rgb(var(--neo-text))]">Hex Value</div>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            const v = e.target.value.toUpperCase()
            if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/.test(v)) onChangeHex(v)
          }}
          className="font-mono text-sm px-2 py-1 border-2 border-[rgb(var(--neo-text))] rounded-none w-[160px]"
          placeholder="#1C1C1C"
          aria-label="Hex color"
        />
        <Button variant="outline" size="sm" onClick={onCopy}>
          Copy
        </Button>
      </div>
    </div>
  )
}

function PresetRow({ presets, onPick }: { presets: string[], onPick: (hex: string) => void }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase mb-1 text-[rgb(var(--neo-text))]">Presets (optional)</div>
      <div className="flex flex-wrap gap-2">
        {presets.slice(0, 8).map((hex) => (
          <button
            key={hex}
            onClick={() => onPick(hex)}
            className="border-2 border-[rgb(var(--neo-text))] w-6 h-6 rounded-none hover:scale-105 transition-transform duration-150"
            style={{ background: hex }}
            aria-label={hex}
            title={hex}
          />
        ))}
      </div>
    </div>
  )
}




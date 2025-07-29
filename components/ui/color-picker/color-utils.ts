export const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v))

// RGB/HEX utilities
export function hexToRgb(hex: string) {
  let c = hex.replace('#','')
  if (c.length === 3) c = c.split('').map(ch => ch+ch).join('')
  const num = parseInt(c, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

export function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2,'0').toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// HSV utilities (better for color pickers)
export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    switch(max) {
      case r: h = ((g - b) / d) + (g < b ? 6 : 0); break
      case g: h = ((b - r) / d) + 2; break
      case b: h = ((r - g) / d) + 4; break
    }
    h *= 60
  }
  const s = max === 0 ? 0 : d / max
  const v = max
  return { h, s: s * 100, v: v * 100 }
}

export function hsvToRgb(h: number, s: number, v: number) {
  s /= 100; v /= 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

export function hexToHsv(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHsv(r, g, b)
}

export function hsvToHex(h: number, s: number, v: number) {
  const { r, g, b } = hsvToRgb(h, s, v)
  return rgbToHex(r, g, b)
}

// Legacy HSL utilities (for backward compatibility)
export function hexToHsla(hex: string) {
  let c = hex.replace('#','')
  if (c.length === 3) c = c.split('').map(ch => ch+ch).join('')
  const num = parseInt(c, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  const r1 = r/255, g1 = g/255, b1 = b/255
  const max = Math.max(r1,g1,b1), min = Math.min(r1,g1,b1)
  let h = 0, s = 0, l = (max+min)/2
  const d = max - min
  if (d !== 0) {
    s = d / (1 - Math.abs(2*l-1))
    switch(max){
      case r1: h = 60 * (((g1-b1)/d) % 6); break
      case g1: h = 60 * (((b1-r1)/d) + 2); break
      case b1: h = 60 * (((r1-g1)/d) + 4); break
    }
  }
  if (h < 0) h += 360
  return { h, s: s*100, l: l*100, a: 100 }
}

export function hslaToHex(h:number,s:number,l:number) {
  s/=100; l/=100
  const c = (1 - Math.abs(2*l - 1)) * s
  const x = c * (1 - Math.abs(((h/60)%2) - 1))
  const m = l - c/2
  let r=0,g=0,b=0
  if (0<=h && h<60) [r,g,b]=[c,x,0]
  else if (60<=h && h<120) [r,g,b]=[x,c,0]
  else if (120<=h && h<180) [r,g,b]=[0,c,x]
  else if (180<=h && h<240) [r,g,b]=[0,x,c]
  else if (240<=h && h<300) [r,g,b]=[x,0,c]
  else [r,g,b]=[c,0,x]
  const to255 = (v:number)=>Math.round((v+m)*255)
  const hex = (n:number)=>n.toString(16).padStart(2,'0')
  return `#${hex(to255(r))}${hex(to255(g))}${hex(to255(b))}`.toUpperCase()
}

// CSS utilities
export const solidCss = (hex:string, a=100)=> a===100 ? hex : `color-mix(in srgb, ${hex} ${a}%, transparent)`

export const gradientCss = (angle:number, stops:[{color:string,offset:number},{color:string,offset:number}]) =>
  `linear-gradient(${angle}deg, ${stops[0].color} ${stops[0].offset * 100}%, ${stops[1].color} ${stops[1].offset * 100}%)`
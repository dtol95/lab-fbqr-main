// Utility to extract and format JSX code for the style guide
import { ReactElement, isValidElement, ReactNode, cloneElement } from 'react'

interface ComponentProps {
  [key: string]: any
}

// Helper function to format props as string
function formatProps(props: ComponentProps): string {
  const formattedProps: string[] = []
  
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children') return // Handle children separately
    
    if (typeof value === 'string') {
      formattedProps.push(`${key}="${value}"`)
    } else if (typeof value === 'boolean' && value === true) {
      formattedProps.push(key)
    } else if (typeof value === 'boolean' && value === false) {
      // Don't include false boolean props
      return
    } else if (typeof value === 'number') {
      formattedProps.push(`${key}={${value}}`)
    } else if (typeof value === 'object' && value !== null) {
      // For objects, try to stringify them
      try {
        formattedProps.push(`${key}={${JSON.stringify(value)}}`)
      } catch {
        formattedProps.push(`${key}={...}`)
      }
    } else if (typeof value === 'function') {
      formattedProps.push(`${key}={${value.name || 'handler'}}`)
    }
  })
  
  return formattedProps.length > 0 ? ' ' + formattedProps.join(' ') : ''
}

// Helper function to get component name
function getComponentName(element: ReactElement): string {
  if (typeof element.type === 'string') {
    return element.type
  } else if (typeof element.type === 'function') {
    return element.type.displayName || element.type.name || 'Component'
  }
  return 'Component'
}

// Helper function to format children
function formatChildren(children: ReactNode, depth: number = 0): string {
  const indent = '  '.repeat(depth)
  
  if (typeof children === 'string') {
    return children
  }
  
  if (typeof children === 'number') {
    return children.toString()
  }
  
  if (isValidElement(children)) {
    return formatElement(children, depth)
  }
  
  if (Array.isArray(children)) {
    return children
      .map(child => {
        if (typeof child === 'string') return child
        if (isValidElement(child)) return `\n${indent}  ${formatElement(child, depth + 1)}`
        return ''
      })
      .join('')
  }
  
  return ''
}

// Main function to format a React element as JSX string
function formatElement(element: ReactElement, depth: number = 0): string {
  const indent = '  '.repeat(depth)
  const componentName = getComponentName(element)
  const props = formatProps(element.props)
  const children = element.props.children
  
  if (!children) {
    return `<${componentName}${props} />`
  }
  
  const formattedChildren = formatChildren(children, depth)
  
  if (typeof children === 'string' || typeof children === 'number') {
    return `<${componentName}${props}>${formattedChildren}</${componentName}>`
  }
  
  return `<${componentName}${props}>${formattedChildren}\n${indent}</${componentName}>`
}

// Main export function to extract code from React elements
export function extractJSXCode(element: ReactElement | ReactElement[]): string {
  try {
    if (Array.isArray(element)) {
      return element.map(el => formatElement(el)).join('\n\n')
    }
    
    return formatElement(element)
  } catch (error) {
    console.warn('Failed to extract JSX code:', error)
    return '// Unable to extract code automatically'
  }
}

// Helper to create a code block from JSX
export function createCodeFromJSX(element: ReactElement | ReactElement[]): string {
  const code = extractJSXCode(element)
  return code
}
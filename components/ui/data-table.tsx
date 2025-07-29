"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"
import { Button } from "./button"

const dataTableVariants = cva(
  "w-full border-2 border-[var(--neo-text)] bg-[var(--neo-bg)] shadow-neo-large",
  {
    variants: {
      density: {
        comfortable: "",
        compact: "",
      },
      variant: {
        default: "",
        striped: "[&_tbody_tr:nth-child(even)]:bg-[var(--neo-muted-bg)]",
        bordered: "[&_td]:border-r [&_td]:border-[var(--neo-text)] [&_td:last-child]:border-r-0",
      },
    },
    defaultVariants: {
      density: "comfortable",
      variant: "default",
    },
  }
)

const dataTableHeaderVariants = cva(
  "border-b-4 border-[var(--neo-text)] bg-[var(--neo-interactive-bg)]",
  {
    variants: {
      density: {
        comfortable: "[&_th]:px-4 [&_th]:py-3",
        compact: "[&_th]:px-3 [&_th]:py-2",
      },
    },
    defaultVariants: {
      density: "comfortable",
    },
  }
)

const dataTableBodyVariants = cva(
  "",
  {
    variants: {
      density: {
        comfortable: "[&_td]:px-4 [&_td]:py-3",
        compact: "[&_td]:px-3 [&_td]:py-2",
      },
    },
    defaultVariants: {
      density: "comfortable",
    },
  }
)

const dataTableRowVariants = cva(
  "border-b-2 border-[var(--neo-text)] last:border-b-0 transition-colors hover:bg-[var(--neo-interactive-bg)]/50",
  {
    variants: {
      selectable: {
        true: "cursor-pointer",
        false: "",
      },
      selected: {
        true: "bg-[var(--neo-accent)]/20",
        false: "",
      },
    },
    defaultVariants: {
      selectable: false,
      selected: false,
    },
  }
)

export type SortDirection = "asc" | "desc" | false
export type SortConfig = {
  key: string
  direction: SortDirection
}

interface DataTableProps extends React.TableHTMLAttributes<HTMLTableElement>,
  VariantProps<typeof dataTableVariants> {
  children: React.ReactNode
}

interface DataTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement>,
  VariantProps<typeof dataTableHeaderVariants> {}

interface DataTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>,
  VariantProps<typeof dataTableBodyVariants> {}

interface DataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement>,
  VariantProps<typeof dataTableRowVariants> {
  onSelect?: (selected: boolean) => void
}

interface SortableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortKey?: string
  sortDirection?: SortDirection
  onSort?: (key: string) => void
  children: React.ReactNode
}

interface SelectableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ className, density, variant, ...props }, ref) => (
    <div className="relative overflow-auto">
      <table
        ref={ref}
        className={cn(dataTableVariants({ density, variant }), className)}
        {...props}
      />
    </div>
  )
)
DataTable.displayName = "DataTable"

const DataTableHeader = React.forwardRef<HTMLTableSectionElement, DataTableHeaderProps>(
  ({ className, density, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(dataTableHeaderVariants({ density }), className)}
      {...props}
    />
  )
)
DataTableHeader.displayName = "DataTableHeader"

const DataTableBody = React.forwardRef<HTMLTableSectionElement, DataTableBodyProps>(
  ({ className, density, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(dataTableBodyVariants({ density }), className)}
      {...props}
    />
  )
)
DataTableBody.displayName = "DataTableBody"

const DataTableRow = React.forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ className, selectable, selected, onSelect, onClick, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      if (selectable && onSelect) {
        onSelect(!selected)
      }
      onClick?.(event)
    }

    return (
      <tr
        ref={ref}
        className={cn(dataTableRowVariants({ selectable, selected }), className)}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
DataTableRow.displayName = "DataTableRow"

const DataTableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn("text-left font-bold uppercase text-sm text-[var(--neo-text)]", className)}
      {...props}
    />
  )
)
DataTableHead.displayName = "DataTableHead"

const DataTableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("text-sm text-[var(--neo-text)] align-middle", className)}
      {...props}
    />
  )
)
DataTableCell.displayName = "DataTableCell"

const SortableHeader = React.forwardRef<HTMLTableCellElement, SortableHeaderProps>(
  ({ className, sortKey, sortDirection, onSort, children, ...props }, ref) => {
    const handleSort = () => {
      if (sortKey && onSort) {
        onSort(sortKey)
      }
    }

    const getSortIcon = () => {
      if (sortDirection === "asc") {
        return <ChevronUp className="icon-xs" />
      }
      if (sortDirection === "desc") {
        return <ChevronDown className="icon-xs" />
      }
      return <ChevronsUpDown className="icon-xs opacity-50" />
    }

    return (
      <DataTableHead
        ref={ref}
        className={cn(
          "cursor-pointer select-none transition-colors hover:bg-[var(--neo-accent)]/20",
          sortKey && "hover:text-[var(--neo-text)]",
          className
        )}
        onClick={handleSort}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortKey && getSortIcon()}
        </div>
      </DataTableHead>
    )
  }
)
SortableHeader.displayName = "SortableHeader"

const SelectableHeader = React.forwardRef<HTMLTableCellElement, SelectableHeaderProps>(
  ({ className, checked, indeterminate, onCheckedChange, ...props }, ref) => (
    <DataTableHead
      ref={ref}
      className={cn("w-12", className)}
      {...props}
    >
      <Checkbox
        checked={checked}
        // @ts-ignore - indeterminate is a valid prop but not in types
        ref={(el: HTMLInputElement | null) => {
          if (el) el.indeterminate = indeterminate ?? false
        }}
        onCheckedChange={onCheckedChange}
        aria-label="Select all"
      />
    </DataTableHead>
  )
)
SelectableHeader.displayName = "SelectableHeader"

const SelectableCell = React.forwardRef<HTMLTableCellElement, {
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <DataTableCell
    ref={ref}
    className={cn("w-12", className)}
    {...props}
  >
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label="Select row"
    />
  </DataTableCell>
))
SelectableCell.displayName = "SelectableCell"

const DataTableEmptyState = React.forwardRef<HTMLTableRowElement, {
  className?: string
  colSpan?: number
  children?: React.ReactNode
}>(({ className, colSpan, children, ...props }, ref) => (
  <DataTableRow ref={ref} className={className} {...props}>
    <DataTableCell colSpan={colSpan} className="h-24 text-center">
      {children || (
        <div className="text-[var(--neo-text)]/60">
          <p className="text-sm font-medium">No data available</p>
          <p className="text-xs mt-1">There are no items to display.</p>
        </div>
      )}
    </DataTableCell>
  </DataTableRow>
))
DataTableEmptyState.displayName = "DataTableEmptyState"

const DataTableLoadingState = React.forwardRef<HTMLTableRowElement, {
  className?: string
  colSpan?: number
  children?: React.ReactNode
}>(({ className, colSpan, children, ...props }, ref) => (
  <DataTableRow ref={ref} className={className} {...props}>
    <DataTableCell colSpan={colSpan} className="h-24 text-center">
      {children || (
        <div className="text-[var(--neo-text)]/60">
          <div className="inline-block w-4 h-4 border-2 border-[var(--neo-text)]/20 border-t-[var(--neo-text)] rounded-full animate-spin" />
          <p className="text-sm font-medium mt-2">Loading...</p>
        </div>
      )}
    </DataTableCell>
  </DataTableRow>
))
DataTableLoadingState.displayName = "DataTableLoadingState"

// Table Toolbar Component
const DataTableToolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-4 border-b-2 border-[var(--neo-text)] bg-[var(--neo-interactive-bg)]", className)}
      {...props}
    />
  )
)
DataTableToolbar.displayName = "DataTableToolbar"

// Table Footer Component  
const DataTableFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-4 border-t-2 border-[var(--neo-text)] bg-[var(--neo-interactive-bg)]", className)}
      {...props}
    />
  )
)
DataTableFooter.displayName = "DataTableFooter"

export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  SortableHeader,
  SelectableHeader,
  SelectableCell,
  DataTableEmptyState,
  DataTableLoadingState,
  DataTableToolbar,
  DataTableFooter,
}
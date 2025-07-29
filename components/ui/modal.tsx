"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CloseButton } from "./close-button"

const modalVariants = cva(
  "fixed inset-0 flex items-center justify-center p-4",
  {
    variants: {
      variant: {
        default: "bg-black/50",
        blur: "bg-black/30 backdrop-blur-sm",
        solid: "bg-[var(--neo-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const modalContentVariants = cva(
  "relative w-full max-w-lg max-h-[85vh] overflow-hidden bg-[var(--neo-bg)] border-2 border-[var(--neo-text)] shadow-neo-large focus:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  }
)

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & VariantProps<typeof modalVariants>
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      modalVariants({ variant }),
      "fixed inset-0 z-[var(--z-modal)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & 
    VariantProps<typeof modalContentVariants> & {
      showCloseButton?: boolean
    }
>(({ className, size, padding, showCloseButton = true, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          modalContentVariants({ size, padding }),
          "z-[var(--z-modal)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <ModalClose asChild>
            <CloseButton className="absolute right-4 top-4 z-10" />
          </ModalClose>
        )}
      </DialogPrimitive.Content>
    </ModalOverlay>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    border?: boolean
  }
>(({ className, border = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 text-left px-6 py-4",
      border && "border-b-2 border-[var(--neo-text)]",
      className
    )}
    {...props}
  />
))
ModalHeader.displayName = "ModalHeader"

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    border?: boolean
    justify?: "start" | "center" | "end" | "between"
  }
>(({ className, border = true, justify = "end", ...props }, ref) => {
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center", 
    end: "justify-end",
    between: "justify-between",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-6 py-4 gap-2",
        border && "border-t-2 border-[var(--neo-text)]",
        justifyClasses[justify],
        className
      )}
      {...props}
    />
  )
})
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-bold uppercase leading-none tracking-tight pr-8",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    scrollable?: boolean
  }
>(({ className, scrollable = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-6 py-4",
      scrollable && "overflow-y-auto",
      className
    )}
    {...props}
  />
))
ModalBody.displayName = "ModalBody"

// Confirmation Modal Preset
interface ConfirmationModalProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  onConfirm?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

const ConfirmationModal = React.forwardRef<
  React.ElementRef<typeof ModalContent>,
  ConfirmationModalProps & React.ComponentPropsWithoutRef<typeof Modal>
>(({ 
  title, 
  description, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  children,
  ...props 
}, ref) => (
  <Modal {...props}>
    <ModalContent ref={ref} size="sm" showCloseButton={false}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalHeader>
      
      {children && <ModalBody>{children}</ModalBody>}
      
      <ModalFooter justify="end">
        <ModalClose asChild>
          <button
            onClick={onCancel}
            className="px-4 py-2 border-2 border-[var(--neo-text)] bg-transparent hover:bg-[var(--neo-interactive-bg)] focus-ring transition-neo"
          >
            {cancelText}
          </button>
        </ModalClose>
        <ModalClose asChild>
          <button
            onClick={onConfirm}
            className={cn(
              "px-4 py-2 border-2 border-[var(--neo-text)] font-bold focus-ring transition-neo",
              variant === "destructive" 
                ? "bg-[var(--neo-destructive)] text-[var(--neo-on-destructive)] hover:bg-[var(--neo-destructive)]/90"
                : "bg-[var(--neo-accent)] text-[var(--neo-on-accent)] hover:bg-[var(--neo-accent)]/90"
            )}
          >
            {confirmText}
          </button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>
))
ConfirmationModal.displayName = "ConfirmationModal"

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ConfirmationModal,
}
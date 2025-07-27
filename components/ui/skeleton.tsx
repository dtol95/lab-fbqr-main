import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse border-2 border-neo-text bg-neo-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

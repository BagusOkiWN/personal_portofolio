import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline"
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "a" : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-4 py-2",
          variant === "solid" &&
            "bg-accent text-bg-primary hover:bg-accent/90 shadow-sm",
          variant === "outline" &&
            "border border-border-color bg-transparent text-text-primary hover:bg-accent-soft hover:text-accent hover:border-accent/50",
          className
        )}
        ref={ref as any}
        {...(props as any)}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

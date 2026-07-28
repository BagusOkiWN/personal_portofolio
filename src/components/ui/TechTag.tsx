import { cn } from "@/lib/utils"

interface TechTagProps {
  name: string
  className?: string
}

export function TechTag({ name, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-color bg-bg-secondary px-2.5 py-0.5 text-xs font-medium font-mono text-text-secondary transition-colors hover:border-accent-soft hover:bg-accent-soft hover:text-accent",
        className
      )}
    >
      {name}
    </span>
  )
}

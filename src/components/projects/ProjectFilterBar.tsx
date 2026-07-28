import { cn } from "@/lib/utils"

interface ProjectFilterBarProps {
  categories: string[]
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export function ProjectFilterBar({ categories, activeCategory, onSelectCategory }: ProjectFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === category
              ? "bg-accent text-bg-primary shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              : "bg-bg-elevated border border-border-color text-text-secondary hover:text-text-primary hover:border-accent-soft"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

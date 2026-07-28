import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface SocialLinksProps {
  variant?: "hero" | "footer"
  className?: string
}

export function SocialLinks({ variant = "hero", className }: SocialLinksProps) {
  const iconSize = variant === "hero" ? 24 : 20

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <a
        href="https://github.com/BagusOkiWN"
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary transition-colors hover:text-accent"
        aria-label="GitHub"
      >
        <FaGithub size={iconSize} />
      </a>
      <a
        href="https://linkedin.com/in/bagusokiwn"
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary transition-colors hover:text-accent"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={iconSize} />
      </a>
      <a
        href="mailto:bagusoki.work@gmail.com"
        className="text-text-secondary transition-colors hover:text-accent"
        aria-label="Email"
      >
        <Mail size={iconSize} />
      </a>
    </div>
  )
}

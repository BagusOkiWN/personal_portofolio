import Image from "next/image"
import { ExternalLink, Info } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Project } from "@/lib/types"
import { TechTag } from "@/components/ui/TechTag"
import { Button } from "@/components/ui/Button"

interface ProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-bg-elevated rounded-xl border border-border-color overflow-hidden hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary">
            <span>No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
          {project.name}
        </h3>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.techStack.slice(0, 3).map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs text-text-secondary self-center">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border-color">
          <Button
            variant="solid"
            className="flex-1 h-9 text-xs gap-1.5"
            onClick={() => onViewDetails(project)}
          >
            <Info size={14} /> Details
          </Button>

          {project.liveDemoUrl && (
            <Button variant="outline" className="flex-1 h-9 text-xs gap-1.5" asChild href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </Button>
          )}

          {project.githubUrl && !project.liveDemoUrl && (
            <Button variant="outline" className="flex-1 h-9 text-xs gap-1.5" asChild href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub size={14} />
              <span>GitHub</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

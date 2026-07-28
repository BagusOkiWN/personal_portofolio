"use client"

import { useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Project } from "@/lib/types"
import { TechTag } from "@/components/ui/TechTag"
import { Button } from "@/components/ui/Button"

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-bg-elevated border border-border-color rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header (Sticky) */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border-color bg-bg-elevated/95 backdrop-blur">
          <h2 id="modal-title" className="text-2xl font-bold text-text-primary pr-8">
            {project.name}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full text-text-secondary hover:bg-bg-secondary hover:text-accent transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveDemoUrl && (
              <Button asChild href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <FaGithub size={16} />
                <span>Source Code</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content (Left, 2 cols) */}
            <div className="md:col-span-2 space-y-8">
              {project.detail.background && (
                <section>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Background</h3>
                  <p className="text-text-secondary leading-relaxed">{project.detail.background}</p>
                </section>
              )}

              {(project.detail.challenges || project.detail.solution) && (
                <section>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Challenges & Solution</h3>
                  <div className="space-y-4">
                    {project.detail.challenges && (
                      <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
                        <p className="text-sm font-medium text-accent mb-1">Challenge:</p>
                        <p className="text-sm text-text-secondary">{project.detail.challenges}</p>
                      </div>
                    )}
                    {project.detail.solution && (
                      <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
                        <p className="text-sm font-medium text-success mb-1">Solution:</p>
                        <p className="text-sm text-text-secondary">{project.detail.solution}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Main Features</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {project.detail.mainFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar (Right, 1 col) */}
            <div className="space-y-8">
              {project.detail.role && (
                <section>
                  <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Role</h3>
                  <p className="text-text-primary font-medium">{project.detail.role}</p>
                </section>
              )}
              
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Category</h3>
                <span className="inline-block px-3 py-1 bg-bg-secondary border border-border-color rounded text-sm text-text-primary">
                  {project.category}
                </span>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.detail.techStack.map((tech) => (
                    <TechTag key={tech} name={tech} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

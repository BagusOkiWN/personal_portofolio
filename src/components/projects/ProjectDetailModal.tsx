"use client"

import { useEffect, useState } from "react"
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Project } from "@/lib/types"
import { TechTag } from "@/components/ui/TechTag"
import { Button } from "@/components/ui/Button"

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

/* ──────────────────────────────────────────────
   Screenshot Carousel (internal component)
────────────────────────────────────────────── */
function ScreenshotCarousel({
  screenshots,
  projectName,
}: {
  screenshots: string[]
  projectName: string
}) {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1))
  const next = () =>
    setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1))

  // Reset index whenever the screenshot list changes
  useEffect(() => {
    setCurrent(0)
  }, [screenshots])

  return (
    <section>
      <h3 className="text-lg font-semibold text-text-primary mb-3">Screenshots</h3>
      <div className="relative w-full overflow-hidden rounded-xl border border-border-color bg-bg-secondary group">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          {screenshots.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`${projectName} screenshot ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons — only shown when >1 screenshot */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/70 border border-border-color text-text-primary hover:bg-accent hover:text-bg-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/70 border border-border-color text-text-primary hover:bg-accent hover:text-bg-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to screenshot ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === current
                      ? "bg-accent w-5"
                      : "bg-text-secondary/40 hover:bg-text-secondary/70"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-bg-primary/70 border border-border-color text-text-secondary tabular-nums">
              {current + 1} / {screenshots.length}
            </span>
          </>
        )}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Main Modal
────────────────────────────────────────────── */
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
        <div className="sticky top-0 z-10 flex flex-col gap-1 p-6 border-b border-border-color bg-bg-elevated/95 backdrop-blur">
          <div className="flex items-center justify-between pr-10">
            <h2 id="modal-title" className="text-2xl font-bold text-text-primary">
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
          {/* Short Description */}
          {project.shortDescription && (
            <p className="text-text-secondary text-sm leading-relaxed">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Screenshot Carousel */}
          {project.detail.screenshots && project.detail.screenshots.length > 0 && (
            <ScreenshotCarousel
              screenshots={project.detail.screenshots}
              projectName={project.name}
            />
          )}

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

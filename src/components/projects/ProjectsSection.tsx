"use client"

import { useState, useMemo } from "react"
import { Project } from "@/lib/types"
import { ProjectFilterBar } from "./ProjectFilterBar"
import { ProjectCard } from "./ProjectCard"
import { ProjectDetailModal } from "./ProjectDetailModal"
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react"

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return ["All", ...Array.from(cats)]
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setVisibleCount(6) // Reset visible count when changing category
  }

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 200) // Clear after animation
  }

  return (
    <section id="projects" className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Featured <span className="text-accent">Projects</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A selection of my recent work, showcasing problem-solving skills and technical expertise.
          </p>
        </div>

        <ProjectFilterBar 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategoryChange} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        
        {filteredProjects.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="gap-2"
            >
              Show More <ChevronDown size={16} />
            </Button>
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border-color rounded-xl">
            <p className="text-text-secondary">No projects found in this category.</p>
          </div>
        )}
      </div>

      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  )
}

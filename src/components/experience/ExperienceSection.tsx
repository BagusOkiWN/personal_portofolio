"use client"

import { Experience } from "@/lib/types"
import { TechTag } from "@/components/ui/TechTag"
import { motion } from "framer-motion"

function ExperienceCard({ experience, isEven }: { experience: Experience, isEven: boolean }) {
  return (
    <div className={`bg-bg-elevated border border-border-color rounded-2xl p-6 md:p-8 hover:border-accent/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-accent/10 transition-all duration-300 relative text-left`}>
      {/* Mobile Period */}
      <div className="md:hidden mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent-soft text-accent border border-accent/20">
          {experience.period}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">{experience.position}</h3>
      <p className="text-accent font-semibold mb-2">{experience.company}</p>
      <p className="text-sm text-text-secondary mb-5 flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        {experience.location}
      </p>

      {experience.description && (
        <p className="text-text-secondary mb-5 leading-relaxed text-sm md:text-base">
          {experience.description}
        </p>
      )}

      {experience.achievements && experience.achievements.length > 0 && (
        <ul className="mb-6 space-y-2 text-sm text-text-secondary">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent mt-0.5 shrink-0">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {experience.techStack.map((tech) => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ experience, isLast, index }: { experience: Experience, isLast: boolean, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col md:flex-row justify-between items-center w-full mb-12 group"
    >
      {/* Timeline line */}
      {!(index === 0 && isLast) && (
        <div 
          className={`absolute left-[27px] w-[2px] bg-border-color md:left-1/2 md:-translate-x-1/2 group-hover:bg-accent/30 transition-colors z-0
            ${index === 0 ? 'top-[37px] md:top-1/2' : 'top-0'}
            ${isLast ? 'bottom-auto h-[37px] md:h-1/2' : 'bottom-[-48px]'}
          `} 
        />
      )}

      {/* Timeline dot */}
      <div className="absolute left-[22.5px] top-[37px] md:top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary md:left-1/2 md:-translate-x-1/2 group-hover:scale-125 group-hover:bg-success shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all z-10 box-content" />

      {/* Left Side */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'hidden md:flex justify-end pr-12'}`}>
        {isEven ? (
          <ExperienceCard experience={experience} isEven={isEven} />
        ) : (
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-mono font-medium bg-accent-soft text-accent border border-accent/20">
              {experience.period}
            </span>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 mt-6 md:mt-0 ${isEven ? 'hidden md:flex justify-start pl-12' : 'md:pl-12'}`}>
        {isEven ? (
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-mono font-medium bg-accent-soft text-accent border border-accent/20">
              {experience.period}
            </span>
          </div>
        ) : (
          <ExperienceCard experience={experience} isEven={isEven} />
        )}
      </div>
    </motion.div>
  )
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Work <span className="text-accent">Experience</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            My professional journey and contributions to various organizations and projects.
          </p>
        </div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              experience={exp}
              isLast={index === experiences.length - 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

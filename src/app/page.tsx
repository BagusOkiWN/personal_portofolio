import { HeroSection } from "@/components/home/HeroSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { getSkills, getExperience, getProjects } from "@/lib/data";

export default function Home() {
  const skills = getSkills();
  const experience = getExperience();
  const projects = getProjects();

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experience} />
      <ProjectsSection projects={projects} />
    </div>
  );
}

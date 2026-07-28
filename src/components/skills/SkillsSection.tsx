"use client"

import { SkillCategory, Skill } from "@/lib/types"
import { motion } from "framer-motion"
import {
  SiPhp, SiJavascript, SiPython, SiLaravel, SiVuedotjs,
  SiHtml5, SiCss, SiMysql, SiSqlite, SiDocker,
  SiLinux, SiGit, SiGithub, SiCloudflare, SiBurpsuite,
  SiGitlab, SiNginx
} from "react-icons/si"
import { FaDatabase, FaNetworkWired, FaShieldAlt, FaBug, FaCodeBranch } from "react-icons/fa"

const getIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    php: <SiPhp size={20} className="text-[#777BB4]" />,
    javascript: <SiJavascript size={20} className="text-[#F7DF1E] bg-black/10 rounded-sm" />,
    python: <SiPython size={20} className="text-[#3776AB]" />,
    laravel: <SiLaravel size={20} className="text-[#FF2D20]" />,
    vue: <SiVuedotjs size={20} className="text-[#4FC08D]" />,
    html: <SiHtml5 size={20} className="text-[#E34F26]" />,
    css: <SiCss size={20} className="text-[#1572B6]" />,
    mysql: <SiMysql size={20} className="text-[#4479A1]" />,
    sqlite: <SiSqlite size={20} className="text-[#003B57] dark:text-[#5E9DC8]" />,
    docker: <SiDocker size={20} className="text-[#2496ED]" />,
    linux: <SiLinux size={20} className="text-text-primary" />,
    git: <SiGit size={20} className="text-[#F05032]" />,
    github: <SiGithub size={20} className="text-text-primary" />,
    cloud: <SiCloudflare size={20} className="text-[#F38020]" />,
    shield: <SiBurpsuite size={20} className="text-[#FF6633]" />,
    "shield-alert": <FaShieldAlt size={20} className="text-red-500" />,
    "shield-check": <FaShieldAlt size={20} className="text-green-500" />,
    bug: <FaBug size={20} className="text-accent" />,
    database: <FaDatabase size={20} className="text-[#336791]" />,
    api: <FaNetworkWired size={20} className="text-[#0096D6]" />,
    "git-pull-request": <FaCodeBranch size={20} className="text-[#F05032]" />,
    gitlab: <SiGitlab size={20} className="text-[#FC6D26]" />,
    "git-labs": <SiGitlab size={20} className="text-[#FC6D26]" />,
    nginx: <SiNginx size={20} className="text-[#009639]" />,
  }

  return iconMap[iconName] || <span className="font-mono text-xs font-bold">{iconName.charAt(0).toUpperCase()}</span>
}

function SkillCard({ skill, index }: { skill: Skill, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="flex items-center gap-3 p-3 rounded-xl border border-border-color bg-bg-elevated hover:border-accent/40 hover:shadow-sm hover:shadow-accent/5 transition-colors group"
    >
      <div className="w-10 h-10 shrink-0 rounded-lg bg-bg-secondary flex items-center justify-center text-text-secondary group-hover:bg-bg-primary transition-colors">
        {getIcon(skill.icon)}
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="font-semibold text-text-primary text-sm truncate group-hover:text-accent transition-colors">{skill.name}</p>
        {skill.level && (
          <p className="text-[10px] text-text-secondary truncate">
            {skill.level}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function SkillCategoryGroup({ category, index }: { category: SkillCategory, index: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-1.5 bg-accent rounded-full" />
        <h3 className="text-lg font-bold text-text-primary">
          {category.category}
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {category.items.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  )
}

export function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id="skills" className="py-20 bg-bg-secondary relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Technical <span className="text-accent">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary max-w-2xl mx-auto"
          >
            A comprehensive list of my technical skills, categorized by domain. I constantly learn and adapt to new technologies.
          </motion.p>
        </div>

        <div>
          {skills.map((category, index) => (
            <SkillCategoryGroup key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}



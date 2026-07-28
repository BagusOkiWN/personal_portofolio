import fs from 'fs';
import path from 'path';
import { SkillCategory, Experience, Project } from './types';

const dataDirectory = path.join(process.cwd(), 'data');

export function getSkills(): SkillCategory[] {
  const filePath = path.join(dataDirectory, 'skills.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as SkillCategory[];
}

export function getExperience(): Experience[] {
  const filePath = path.join(dataDirectory, 'experience.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Experience[];
}

export function getProjects(): Project[] {
  const filePath = path.join(dataDirectory, 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((project) => project.slug === slug);
}

"use client"

import Image from "next/image"
import { FaReplyAll } from "react-icons/fa"
import { SocialLinks } from "./SocialLinks"
import { StatusBadge } from "./StatusBadge"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <StatusBadge status="Open to Work" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
              Hi, I'm <span className="text-accent">Bagus Oki W. Nugroho</span>
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-text-secondary font-mono mb-6">
              Programmer
            </h2>

            <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
              I enjoy building web applications, learning modern technologies, and creating practical solutions through clean, maintainable code.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Button variant="solid" asChild href="#projects">
                View Projects
              </Button>
              <Button variant="outline" asChild href="cv/CV_ATS_Bagus Oki W. Nugroho_Programmer_2026_ID.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </Button>
            </div>

            <SocialLinks variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center md:justify-end relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-bg-elevated shadow-xl bg-bg-secondary flex items-center justify-center">
              <Image src="/images/freya.jpg" alt="Profile" width={500} height={500} className="w-full h-full object-cover" />
            </div>

            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/10 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

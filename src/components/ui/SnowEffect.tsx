"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { isWinterSeason, WINTER_MONTHS } from "@/lib/season"

type SnowflakeType = "crystal" | "star" | "dot"

interface Snowflake {
  x: number
  y: number
  radius: number
  speedY: number
  speedX: number
  swaySpeed: number
  swayOffset: number
  opacity: number
  type: SnowflakeType
  rotation: number
  rotationSpeed: number
}

export interface SnowEffectProps {
  /**
   * Bulan di mana efek salju aktif (0 = Januari, 10 = November, 11 = Desember).
   * Default: [10, 11, 0, 1] (November, Desember, Januari, Februari).
   */
  activeMonths?: number[]
  /**
   * Jika true, efek salju akan selalu aktif tanpa memandang tanggal/bulan.
   */
  forceEnable?: boolean
}

// ──────────────────────────────────────────────
// Helper Drawing Functions
// ──────────────────────────────────────────────

function renderCrystalArms(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const armAngle = (i * Math.PI) / 3
    const cos = Math.cos(armAngle)
    const sin = Math.sin(armAngle)

    ctx.moveTo(0, 0)
    ctx.lineTo(cos * r, sin * r)

    const bDist = r * 0.72
    const bx = cos * bDist
    const by = sin * bDist
    const bLen = r * 0.25
    const a1 = armAngle + Math.PI / 4
    const a2 = armAngle - Math.PI / 4

    ctx.moveTo(bx, by)
    ctx.lineTo(bx - Math.cos(a1) * bLen, by - Math.sin(a1) * bLen)
    ctx.moveTo(bx, by)
    ctx.lineTo(bx - Math.cos(a2) * bLen, by - Math.sin(a2) * bLen)
  }
  ctx.stroke()
}

function drawCrystal(ctx: CanvasRenderingContext2D, r: number, isDark: boolean, opacity: number) {
  if (!isDark) {
    ctx.strokeStyle = `rgba(80, 115, 160, ${Math.min(0.85, opacity * 0.75)})`
    ctx.lineWidth = Math.max(1.8, r * 0.22)
    ctx.lineCap = "round"
    renderCrystalArms(ctx, r)
  }

  if (isDark) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
    ctx.shadowBlur = 3
    ctx.lineWidth = Math.max(1.2, r * 0.15)
  } else {
    ctx.strokeStyle = `rgba(255, 255, 255, 0.95)`
    ctx.fillStyle = `rgba(255, 255, 255, 0.95)`
    ctx.shadowColor = "rgba(80, 115, 160, 0.4)"
    ctx.shadowBlur = 3
    ctx.lineWidth = Math.max(1.1, r * 0.13)
  }
  ctx.lineCap = "round"
  renderCrystalArms(ctx, r)

  ctx.beginPath()
  ctx.arc(0, 0, Math.max(1.2, r * 0.18), 0, Math.PI * 2)
  ctx.fill()
}

function renderStarArms(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const armAngle = (i * Math.PI) / 3
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(armAngle) * r, Math.sin(armAngle) * r)
  }
  ctx.stroke()

  for (let i = 0; i < 6; i++) {
    const armAngle = (i * Math.PI) / 3
    ctx.beginPath()
    ctx.arc(Math.cos(armAngle) * r, Math.sin(armAngle) * r, Math.max(1, r * 0.2), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.beginPath()
  ctx.arc(0, 0, Math.max(1.2, r * 0.22), 0, Math.PI * 2)
  ctx.fill()
}

function drawStar(ctx: CanvasRenderingContext2D, r: number, isDark: boolean, opacity: number) {
  if (!isDark) {
    ctx.strokeStyle = `rgba(80, 115, 160, ${Math.min(0.85, opacity * 0.75)})`
    ctx.fillStyle = `rgba(80, 115, 160, ${Math.min(0.85, opacity * 0.75)})`
    ctx.lineWidth = Math.max(1.8, r * 0.22)
    ctx.lineCap = "round"
    renderStarArms(ctx, r)
  }

  if (isDark) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.shadowColor = "rgba(255, 255, 255, 0.4)"
    ctx.shadowBlur = 3
    ctx.lineWidth = Math.max(1.1, r * 0.15)
  } else {
    ctx.strokeStyle = `rgba(255, 255, 255, 0.95)`
    ctx.fillStyle = `rgba(255, 255, 255, 0.95)`
    ctx.shadowColor = "rgba(80, 115, 160, 0.35)"
    ctx.shadowBlur = 3
    ctx.lineWidth = Math.max(1.1, r * 0.13)
  }
  ctx.lineCap = "round"
  renderStarArms(ctx, r)
}

function drawDot(ctx: CanvasRenderingContext2D, r: number, isDark: boolean, opacity: number) {
  ctx.beginPath()
  ctx.arc(0, 0, r, 0, Math.PI * 2)
  if (isDark) {
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
    ctx.shadowColor = "rgba(255, 255, 255, 0.4)"
    ctx.shadowBlur = 2
  } else {
    ctx.fillStyle = `rgba(255, 255, 255, 0.95)`
    ctx.shadowColor = "rgba(80, 115, 160, 0.45)"
    ctx.shadowBlur = 3
  }
  ctx.fill()
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export function SnowEffect({
  activeMonths = WINTER_MONTHS,
  forceEnable = false,
}: SnowEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isSeason = isWinterSeason(activeMonths, forceEnable)

  useEffect(() => {
    if (!mounted || !isSeason) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const flakeCount = Math.max(30, Math.min(55, Math.floor(width / 34)))
    const flakes: Snowflake[] = []

    for (let i = 0; i < flakeCount; i++) {
      const randType = Math.random()
      let type: SnowflakeType = "dot"
      let radius = Math.random() * 1.5 + 1.2

      if (randType < 0.4) {
        type = "crystal"
        radius = Math.random() * 5 + 7
      } else if (randType < 0.7) {
        type = "star"
        radius = Math.random() * 3 + 4.5
      }

      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speedY: type === "dot" ? Math.random() * 0.5 + 0.4 : Math.random() * 0.6 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.45,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.018,
      })
    }

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    let angle = 0

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)
      angle += 0.01

      const isDark = resolvedTheme === "dark"

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i]
        flake.y += flake.speedY
        flake.x += Math.sin(angle * flake.swaySpeed * 10 + flake.swayOffset) * 0.4 + flake.speedX
        flake.rotation += flake.rotationSpeed

        if (flake.y > height + 15) {
          flake.y = -15
          flake.x = Math.random() * width
        }

        if (flake.x > width + 15) {
          flake.x = -15
        } else if (flake.x < -15) {
          flake.x = width + 15
        }

        ctx.save()
        ctx.translate(flake.x, flake.y)
        ctx.rotate(flake.rotation)

        if (flake.type === "crystal") {
          drawCrystal(ctx, flake.radius, isDark, flake.opacity)
        } else if (flake.type === "star") {
          drawStar(ctx, flake.radius, isDark, flake.opacity)
        } else {
          drawDot(ctx, flake.radius, isDark, flake.opacity)
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, isSeason, resolvedTheme])

  if (!mounted || !isSeason) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  )
}

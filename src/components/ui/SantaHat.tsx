"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { isWinterSeason, WINTER_MONTHS } from "@/lib/season"

export interface SantaHatProps {
  /**
   * Class tambahan untuk penyesuaian posisi atau ukuran.
   */
  className?: string
  /**
   * Jika true, topi santa akan selalu muncul tanpa memandang tanggal/bulan.
   */
  forceEnable?: boolean
  /**
   * Bulan aktif (0 = Januari, 10 = November, 11 = Desember).
   * Default mengikuti konfigurasi musim salju: [10, 11, 0, 1].
   */
  activeMonths?: number[]
}

export function SantaHat({
  className = "",
  forceEnable = false,
  activeMonths = WINTER_MONTHS,
}: SantaHatProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isSeason = isWinterSeason(activeMonths, forceEnable)

  if (!mounted || !isSeason) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -2, 0],
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
      }}
      whileHover={{
        scale: 1.05,
        rotate: [-1, 1.5, -1],
        transition: { duration: 0.3 },
      }}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-20 ${className}`}
      title="Merry Christmas & Happy Holidays! 🎄"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.32)]"
      >
        <defs>
          {/* Warna merah khas natal sesuai referensi gambar */}
          <linearGradient id="hatRedExact" x1="40" y1="-28" x2="110" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E22438" />
            <stop offset="65%" stopColor="#CF142A" />
            <stop offset="100%" stopColor="#A80D1D" />
          </linearGradient>

          {/* Warna putih krem lembut list dan pompom */}
          <linearGradient id="brimWhiteExact" x1="30" y1="-10" x2="100" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFF9F5" />
            <stop offset="100%" stopColor="#F5ECE4" />
          </linearGradient>
        </defs>

        {/* 
          1. Badan Topi Merah
          Batas bawahnya diselipkan tepat di tengah list putih (jauh di atas garis bawah list putih),
          sehingga tidak ada garis stroke hitam yang tembus atau terlihat di bawah list putih.
        */}
        <path
          d="
            M 36 -5
            C 46 -18, 58 -28, 72 -28
            C 88 -28, 100 -16, 106 2
            C 109 12, 110 24, 106 34
            C 102 36, 100 26, 98 18
            C 76 1, 54 -8, 36 -5
            Z
          "
          fill="url(#hatRedExact)"
          stroke="#241A18"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 
          2. List Bulu Putih
          Menutupi penuh batas bawah kain merah dengan solid.
          Garis bawahnya bersih melengkung mengikuti avatar tanpa ada garis lain yang overlap.
        */}
        <path
          d="
            M 34 4
            C 50 -1, 74 6, 94 25
            C 99 28, 102 22, 99 16
            C 78 -2, 54 -10, 32 -6
            C 28 -6, 28 2, 34 4
            Z
          "
          fill="url(#brimWhiteExact)"
          stroke="#241A18"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 
          3. Bola Pompom Putih di Ujung Kain Merah (r: 8px)
        */}
        <circle
          cx="108"
          cy="40"
          r="8"
          fill="url(#brimWhiteExact)"
          stroke="#241A18"
          strokeWidth="2"
        />

        {/* Highlight lembut di dalam pompom */}
        <circle
          cx="106"
          cy="38"
          r="2.8"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  )
}

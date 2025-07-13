"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.3,
  lightLineColor = "rgba(255, 255, 255, 0.1)",
  darkLineColor = "rgba(255, 255, 255, 0.05)",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      bottomImage = {
        light: "https://farmui.vercel.app/dashboard-light.png",
        dark: "https://farmui.vercel.app/dashboard.png",
      },
      gridOptions = {
        angle: 65,
        cellSize: 60,
        opacity: 0.3,
        lightLineColor: "rgba(255, 255, 255, 0.1)",
        darkLineColor: "rgba(255, 255, 255, 0.05)",
      },
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative z-10", className)} ref={ref} {...props}>
        {/* 🌌 Enhanced Black Gradient Background */}
        <div className="absolute inset-0 -z-10 h-full w-full">
          {/* Base black */}
          <div className="absolute inset-0 bg-black" />
          
          {/* Subtle dark gray gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          
          {/* Radial highlight in center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_30%,rgba(64,64,64,0.3),transparent)]" />
          
          {/* Bottom fade to pure black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_60%,rgba(0,0,0,0.8))]" />
        </div>

        <section className="relative mx-auto max-w-full">
          <RetroGrid {...gridOptions} />

          <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              {/* Title Badge */}
              <div className="group inline-flex items-center mx-auto rounded-full border border-white/10 bg-gradient-to-tr from-white/5 via-gray-400/10 to-transparent px-6 py-3 text-sm text-gray-300 font-geist backdrop-blur-lg">
                {title}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white">
                <span>{subtitle.regular}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {subtitle.gradient}
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-400">
                {description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center justify-center pt-4">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-black text-xs font-medium backdrop-blur-3xl">
                    <a
                      href={ctaHref}
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-tr from-white/5 via-purple-400/20 to-transparent text-white hover:from-white/10 hover:via-purple-400/30 transition-all py-4 px-10 text-sm sm:w-auto"
                    >
                      {ctaText}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </span>
              </div>
            </div>

            {/* Bottom Image Preview */}
            {bottomImage && (
              <div className="relative mx-auto mt-24 max-w-6xl z-10">
                <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-400/20 shadow-2xl">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                    <Image
                      src={bottomImage.light}
                      alt="Light mode dashboard preview"
                      fill
                      className="object-cover shadow-lg transition-all duration-500 hover:scale-105 dark:hidden border border-white/10"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority
                    />
                    <Image
                      src={bottomImage.dark}
                      alt="Dark mode dashboard preview"
                      fill
                      className="hidden object-cover shadow-lg transition-all duration-500 hover:scale-105 dark:block border border-white/10"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  },
)

HeroSection.displayName = "HeroSection"
export { HeroSection }
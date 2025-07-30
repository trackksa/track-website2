"use client"

import { useState, useEffect } from "react"

interface WaveShowcaseProps {
  images: string[]
  centerImage?: string
}

export function WaveShowcase({ images, centerImage }: WaveShowcaseProps) {
  // Hover effect disabled
  // const [hoveredWave, setHoveredWave] = useState<number | null>(null)
  const hoveredWave = null;
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const getWaveTransform = (_index: number) => ({
    translateX: 0,
    scaleX: 1,
    scaleY: 1,
  });

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-12 h-96" style={{ overflow: 'visible' }}>
      <svg className="w-full h-96" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
        <defs>
          {images.map((image, index) => (
            <pattern key={index} id={`waveImage${index}`} patternUnits="userSpaceOnUse" width="120" height="200">
              <image href={image} x="0" y="0" width="120" height="200" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          ))}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#28bba4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#28bba4" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#28bba4" floodOpacity="0.4" />
          </filter>
          {/* Glow filter for center image */}
          <filter id="centerGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* ClipPath for rounded center image */}
          <clipPath id="centerImageClip">
            <rect x="310" y="18" width="600" height="380" rx="32" ry="32" />
          </clipPath>
        </defs>

        {/* Center image between the waves, rendered first so waves are above it */}
        {centerImage && (
          <image
            href={centerImage}
            x={310}
            y={0}
            width={680}
            height={420}
            clipPath="url(#centerImageClip)"
            style={{
              filter: 'url(#centerGlow) drop-shadow(0 8px 24px #28bba4AA)',
              transition: 'transform 0.3s',
            }}
            className="animate-float"
          />
        )}

        {/* Left 5 waves */}
        {Array.from({ length: 5 }).map((_, index) => {
          const baseHeight = 80 + Math.sin(index * 0.6) * 50;
          const animatedHeight = baseHeight + Math.sin((animationPhase + index * 10) * 0.1) * 20;
          const isHovered = false;
          const transform = getWaveTransform(index);
          // Centered: first left wave at x=0
          const waveSpacing = 70;
          const waveX = -50 + index * waveSpacing;
          const hoveredWidth = 90;
          const hoveredHeight = 110;
          const rectWidth = isHovered ? hoveredWidth : 30;
          const rectHeight = isHovered ? hoveredHeight : animatedHeight;
          const waveY = 250 - (isHovered ? hoveredHeight : animatedHeight);
          return (
            <g key={index}>
              <rect
                x={waveX}
                y={waveY}
                width={rectWidth}
                height={rectHeight}
                rx={isHovered ? "12" : "8"}
                fill={isHovered ? `url(#waveImage${index % images.length})` : "url(#waveGradient)"}
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `translate(${transform.translateX}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`,
                  transformOrigin: `${waveX + rectWidth / 2}px ${waveY + rectHeight}px`,
                  filter: "none",
                  opacity: 1,
                  zIndex: 1,
                }}
              />
            </g>
          );
        })}

        {/* Right 5 waves */}
        {Array.from({ length: 5 }).map((_, i) => {
          const index = i + 5;
          const baseHeight = 80 + Math.sin(index * 0.6) * 50;
          const animatedHeight = baseHeight + Math.sin((animationPhase + index * 10) * 0.1) * 20;
          const isHovered = false;
          const transform = getWaveTransform(index);
          // Centered: first right wave at x=740 (460+280)
          const waveSpacing = 70;
          const waveX = 950 + i * waveSpacing;
          const hoveredWidth = 90;
          const hoveredHeight = 110;
          const rectWidth = isHovered ? hoveredWidth : 30;
          const rectHeight = isHovered ? hoveredHeight : animatedHeight;
          const waveY = 250 - (isHovered ? hoveredHeight : animatedHeight);
          return (
            <g key={index}>
              <rect
                x={waveX}
                y={waveY}
                width={rectWidth}
                height={rectHeight}
                rx={isHovered ? "12" : "8"}
                fill={isHovered ? `url(#waveImage${index % images.length})` : "url(#waveGradient)"}
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `translate(${transform.translateX}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`,
                  transformOrigin: `${waveX + rectWidth / 2}px ${waveY + rectHeight}px`,
                  filter: "none",
                  opacity: 1,
                  zIndex: 1,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Enhanced glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out"
          style={{
            width: hoveredWave !== null ? "140%" : "100%",
            height: hoveredWave !== null ? "32px" : "20px",
            background: `radial-gradient(ellipse, rgba(40, 187, 164, ${hoveredWave !== null ? 0.5 : 0.25}) 0%, transparent 70%)`,
            filter: "blur(16px)",
          }}
        />

        {/* Focused glow for hovered wave */}
        {hoveredWave !== null && (
          <div
            className="absolute bottom-0 transition-all duration-700 ease-out"
            style={{
              left: `${15 + hoveredWave * 8}%`,
              width: "20%",
              height: "40px",
              background: "radial-gradient(ellipse, rgba(40, 187, 164, 0.8) 0%, transparent 70%)",
              filter: "blur(12px)",
              transform: "translateX(-50%)",
            }}
          />
        )}
      </div>

      {/* Enhanced ripple effect */}
      {hoveredWave !== null && (
        <div
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: `${15 + hoveredWave * 8}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-24 h-24 border-2 border-[#28bba4]/40 rounded-full animate-ping" />
          <div
            className="absolute inset-3 border border-[#28bba4]/30 rounded-full animate-ping"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute inset-6 border border-[#28bba4]/20 rounded-full animate-ping"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      )}
      <style>{`
        .animate-float {
          animation: floatY 2.5s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  )
}

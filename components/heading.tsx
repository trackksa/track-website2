"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Mic, Film, Radio, Palette, Play } from "lucide-react";

interface HeaderPageProps {
  title: string;
  description: string;
  image: string;
}

export default function HeaderPage({
  title = "Our Services",
  description = "Professional event coverage, audio production, and visual storytelling that brings your vision to life.",
  image = "/placeholder.svg?height=600&width=800",
}: HeaderPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);

    const generateHeights = () =>
      Array.from({ length: 150 }, () => Math.floor(Math.random() * 30 + 10));

    setWaveHeights(generateHeights());

    const interval = setInterval(() => {
      setWaveHeights(generateHeights());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: Camera, label: "Photography", delay: "delay-100" },
    { icon: Film, label: "Videography", delay: "delay-200" },
    { icon: Radio, label: "Broadcasting", delay: "delay-300" },
    { icon: Mic, label: "Audio Production", delay: "delay-400" },
    { icon: Play, label: "Live Streaming", delay: "delay-500" },
    { icon: Palette, label: "Visual Arts", delay: "delay-600" },
  ];

  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#29bba5]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

        {/* Floating Icons */}
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={service.label}
              className={`absolute opacity-10 text-[#29bba5] transition-all duration-1000 ${
                service.delay
              } ${
                isVisible
                  ? "translate-y-0 opacity-20"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                left: `${10 + index * 12}%`,
                top: `${20 + (index % 3) * 25}%`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <Icon size={36} className="animate-pulse" />
            </div>
          );
        })}

        {/* Decorative Shapes */}
        <div className="absolute top-20 right-20 w-28 h-28 border border-[#29bba5]/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 border-2 border-[#29bba5]/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-14 h-14 bg-[#29bba5]/10 rounded-full animate-bounce"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[60vh]">
          {/* Text */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h1
              className={`text-4xl sm:text-5xl font-extralight lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* First word with gradient */}
              <div className="inline-block">
                {title.split(" ")[0] && (
                  <span className="text-7xl font-extralight bg-gradient-to-r from-white to-[#28bba4] bg-clip-text text-transparent">
                    {title.split(" ")[0]}
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#29bba5]/50 rounded-full"></span>
                  </span>
                )}
              </div>
              {/* Rest of the title on next line */}
              <div className="block mt-2">
                {title.split(" ").slice(1).join(" ")}
              </div>
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-10 opacity-0 scale-95"
            }`}
          >
            <div className="relative group lg:max-w-[90%] mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#29bba5]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={image}
                  alt="Creative Media"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔴 Red Curved Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-auto">
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="rgba(41, 187, 165, 0.1)"
          />
        </svg>
      </div>

      {/* 🟢 Music Bars RIGHT AT BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <div className="flex justify-between items-end w-full px-2 pb-1">
          {waveHeights.map((height, index) => (
            <div
              key={index}
              className="bg-[#29bba5] rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: "2px",
                height: `${height}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
